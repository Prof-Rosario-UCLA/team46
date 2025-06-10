import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 min
  max      : 100,             // limit each IP
  standardHeaders: true,      // RateLimit-* headers
  legacyHeaders  : false,     // disable X-RateLimit-*
  handler  : (_req, res) => {
    return res.status(429).json({
      error: 'Too many requests — please wait a bit and try again.',
    });
  },
});
