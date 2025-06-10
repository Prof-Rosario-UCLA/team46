// server/routes/auth.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';

const prisma = new PrismaClient();
const router = express.Router();

/** Helper to sign a JWT with { uid } payload **/
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });
}

/** POST /api/auth/signup **/
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash },
    });

    const token = signToken({ uid: user.id });
    //   ←–– Make sure this name is "jwt"
    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .json({ id: user.id, email: user.email });
  } catch (err) {
    // handle duplicate‐email error
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ message: 'Email already registered' });
    }
    next(err);
  }
});

/** POST /api/auth/login **/
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ uid: user.id });
    //   ←–– Again, use "jwt" (not "token")
    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
});

/** POST /api/auth/logout **/
router.post('/logout', (_req, res) => {
  // Clear "jwt" cookie (sameName + sameSite + same secure flag)
  res
    .clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .json({ message: 'logged out' });
});

export default router;
