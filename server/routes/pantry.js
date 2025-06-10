// server/routes/pantry.js

import express from 'express';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import rateLimiter from '../rateLimiter.js';    // ← import limiter
import redis from '../lib/redis.js';

const CACHE_KEY   = (uid) => `pantry:${uid}`;
const TTL_SECONDS = 60;
const router      = express.Router();

async function bustPantryCache(uid) {
  await redis.del(CACHE_KEY(uid));
}

/* ─────────────────── All routes need a valid JWT ──────────────────── */
router.use(requireAuth);

/* ───── Apply rate‐limit *after* auth ─── 100 req / 15 min per IP ───── */
router.use(rateLimiter);

/* ────────────────────────── GET /api/pantry ───────────────────────── */
router.get('/', async (req, res, next) => {
  const key = CACHE_KEY(req.user.uid);
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log('🔵 Pantry cache HIT');
      return res.json(JSON.parse(cached));
    }
    console.log('⚪️ Pantry cache MISS');
    const items = await prisma.pantryItem.findMany({
      where: { userId: req.user.uid },
      include: { product: true },
    });
    await redis.setEx(key, TTL_SECONDS, JSON.stringify(items));
    return res.json(items);
  } catch (err) {
    next(err);
  }
});

/* ────────────────────────── POST /api/pantry ──────────────────────── */
router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity, expiresAt } = req.body;
    const item = await prisma.pantryItem.create({
      data: {
        userId   : req.user.uid,
        productId,
        quantity,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: { product: true },
    });
    await bustPantryCache(req.user.uid);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

/* ─────────────────────── DELETE /api/pantry/clear ─────────────────── */
router.delete('/clear', async (req, res, next) => {
  try {
    await prisma.pantryItem.deleteMany({ where: { userId: req.user.uid } });
    await bustPantryCache(req.user.uid);
    res.json({ cleared: true });
  } catch (err) {
    next(err);
  }
});

/* ───────────────────────── PATCH /api/pantry/:id ──────────────────── */
router.patch('/:id', async (req, res, next) => {
  try {
    const { quantity, expiresAt } = req.body;
    const item = await prisma.pantryItem.update({
      where: { id: req.params.id },
      data : {
        quantity,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: { product: true },
    });
    await bustPantryCache(req.user.uid);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

/* ───────────────────── PATCH /api/pantry/:id/decrement ────────────── */
router.patch('/:id/decrement', async (req, res, next) => {
  try {
    const existing = await prisma.pantryItem.findUnique({
      where  : { id: req.params.id },
      include: { product: { select: { id: true, nutrition: true } } },
    });
    if (!existing) return res.status(404).json({ error: 'Item not found' });

    const nut  = existing.product?.nutrition ?? {};
    const kcal = nut['energy-kcal_value'] ?? nut['energy-kcal'] ?? 0;
    const prot = nut['proteins_value']     ?? nut['proteins']     ?? 0;

    await prisma.consumptionLog.create({
      data: {
        userId   : existing.userId,
        productId: existing.productId,
        calories : kcal,
        proteins : prot,
      },
    });

    let payload;
    if (existing.quantity > 1) {
      payload = await prisma.pantryItem.update({
        where : { id: req.params.id },
        data  : { quantity: existing.quantity - 1 },
        include: { product: true },
      });
    } else {
      await prisma.pantryItem.delete({ where: { id: req.params.id } });
      payload = { id: req.params.id, removed: true };
    }

    await bustPantryCache(req.user.uid);
    res.json(payload);
  } catch (err) {
    next(err);
  }
});

/* ───────────────────────── DELETE /api/pantry/:id ─────────────────── */
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.pantryItem.delete({ where: { id: req.params.id } });
    await bustPantryCache(req.user.uid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
