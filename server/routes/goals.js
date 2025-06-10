// server/routes/goals.js
//
// Routes for creating-/updating a user’s daily macro goals
// and returning a “snapshot” of today’s progress.
//
// ──────────────────────────────────────────────────────────

import express from 'express';
import { startOfDay, endOfDay } from 'date-fns';

import prisma from '../lib/prisma.js';            // adjust path if needed
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/* ───────────────────────── 1 ▸ CRUD (one-row) GOAL ───────────────────────── */

/**
 * GET /api/goals
 * Return the single Goal row for the logged-in user (or null).
 */
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const goal = await prisma.goal.findUnique({
      where: { userId: req.user.uid }
    });
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/goals
 * Upsert a goal row.
 * Body: { kcalDaily: Number, proteinG: Number }
 */
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { kcalDaily, proteinG } = req.body;

    if (typeof kcalDaily !== 'number' || typeof proteinG !== 'number') {
      return res.status(400).json({ error: 'kcalDaily and proteinG must be numbers' });
    }

    const goal = await prisma.goal.upsert({
      where: { userId: req.user.uid },          // ✅ userId unique index in schema
      update: { kcalDaily, proteinG },
      create: { userId: req.user.uid, kcalDaily, proteinG }
    });

    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
});

/* ───────────────────────── 2 ▸ TODAY SNAPSHOT ────────────────────────────── */

/**
 * GET /api/goals/snapshot
 * Returns:
 * {
 *   goal:   { kcalDaily, proteinG } | null,
 *   eaten:  { kcal, protein },
 *   pct:    { kcal, protein }
 * }
 */
router.get('/snapshot', requireAuth, async (req, res, next) => {
  try {
    const uid = req.user.uid;

    /* 1. user’s goal row (may be null) */
    const goal = await prisma.goal.findUnique({
      where: { userId: uid },
      select: { kcalDaily: true, proteinG: true }
    });

    /* 2. aggregate today’s consumption */
    const todayStart = startOfDay(new Date());
    const todayEnd   = endOfDay(todayStart);

    const totals = await prisma.consumptionLog.aggregate({
      _sum: {
        calories: true,
        proteins: true
      },
      where: {
        userId: uid,
        createdAt: { gte: todayStart, lte: todayEnd }
      }
    });

    const eatenKcal = totals._sum.calories ?? 0;
    const eatenProt = totals._sum.proteins ?? 0;

    /* 3. % of goal reached (guard divide-by-zero) */
    const pct = goal
      ? {
          kcal   : goal.kcalDaily  ? (eatenKcal / goal.kcalDaily)  * 100 : 0,
          protein: goal.proteinG   ? (eatenProt / goal.proteinG)   * 100 : 0
        }
      : { kcal: 0, protein: 0 };

    res.json({
      goal,
      eaten: { kcal: eatenKcal, protein: eatenProt },
      pct
    });
  } catch (err) {
    next(err);
  }
});
// DELETE or POST /api/goals/snapshot/reset
router.post('/snapshot/reset', requireAuth, async (req, res, next) => {
  try {
    const uid = req.user.uid;
    // compute today bounds
    const todayStart = startOfDay(new Date());
    const todayEnd   = endOfDay(todayStart);

    // delete all today’s logs
    await prisma.consumptionLog.deleteMany({
      where: {
        userId: uid,
        createdAt: { gte: todayStart, lte: todayEnd }
      }
    });
    res.status(204).send();  // no content
  } catch (err) {
    next(err);
  }
});

export default router;
