/* ------------------------------------------------------------------
 * Minimal Express API for PantryPal
 * ------------------------------------------------------------------
 * • GET /healthz → "OK"
 * • Runs on PORT env var (defaults 4000)
 * • In production, serves the built React app from /dist
 * ------------------------------------------------------------------ */

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config(); // loads .env if present

const app  = express();
const port = process.env.PORT || 4000;

/* ---------- basic health check ---------------------------------- */
app.get('/healthz', (_req, res) => res.send('OK'));

/* ---------- production static file handler ----------------------- */
const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const clientDir  = path.join(__dirname, '../dist'); // vite build output

if (process.env.NODE_ENV === 'production') {
  // Serve static assets
  app.use(express.static(clientDir));

  // SPA fallback: all non-API routes → index.html
  app.use((_req, res) =>
    res.sendFile(path.join(clientDir, 'index.html'))
  );
}

/* ---------- start server ---------------------------------------- */
app.listen(port, () => {
  console.log(`🚀  API ready on http://localhost:${port}`);
});
