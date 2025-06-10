/* ------------------------------------------------------------------
 * PantryPal API entry (Express 5)
 * ------------------------------------------------------------------ */

import express from 'express';

import logger from './logger.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import productRoutes from './routes/products.js';
import goalsRouter from './routes/goals.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app  = express();
const port = process.env.PORT || 4000;

/* ---------- global middleware ---------------------------------- */
import pantryRoutes from './routes/pantry.js';

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(logger);       // every request → one JSON log line


/* ---------- routes that DON’T need CSRF (auth) ----------------- */
app.use('/api/auth', authRouter);

/* ---------- CSRF protection for everything that follows -------- */
app.use(
  csrf({
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  })
);

/* provide CSRF token to client */
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use('/api/products', productRoutes);

/* ---------- protected API routes ------------------------------- */
app.use('/api/users', usersRouter);
app.use('/api/pantry', pantryRoutes);  // rate-limiter now lives inside pantryRoutes

/* ---------- other protected routes ----------------------------- */
app.use('/api/goals', goalsRouter);
app.use('/api/ai', aiRouter);

/* ---------- health check --------------------------------------- */
app.get('/healthz', (_req, res) => res.send('OK'));

/* ---------- production static & SPA fallback ------------------- */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../dist');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDir));
  app.use((_req, res) => res.sendFile(path.join(clientDir, 'index.html')));
}

/* ---------- start server --------------------------------------- */
app.listen(port, () => {
  console.log(`🚀  API ready on http://localhost:${port}`);
});
