// server/middleware/auth.js

import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  // Look for a cookie named "jwt"
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    // Validate the token using the same secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the payload (with .uid) to req.user
    req.user = payload; // e.g. { uid: "44f9..." }
    next();
  } catch {
    return res.status(401).send('Unauthorized');
  }
}
