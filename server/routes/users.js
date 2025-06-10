import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { requireAuth } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/users
router.get('/', async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, items: true, goals: true },
  });
  res.json(users);
});
router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.uid },
    select: { id: true, email: true },
  });
  res.json(user);
});


export default router;
