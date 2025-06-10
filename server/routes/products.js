// server/routes/products.js
import express from 'express';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/products/by-upc
 *
 * Clients may pass any subset of { upc, name, brand, nutrition }.
 *   • If the UPC already exists we return / update it.
 *   • If not, we create it — either with client-supplied fields or
 *     by fetching from Open Food Facts.
 */
router.post('/by-upc', requireAuth, async (req, res, next) => {
  try {
    const { upc, name, brand, nutrition } = req.body;
    if (!upc) return res.status(400).json({ error: 'Missing UPC' });

    /* ------------------------------------------------------------
     * Case 1 → product exists already
     * ---------------------------------------------------------- */
    const existing = await prisma.product.findUnique({ where: { upc } });
    if (existing) {
      // Opt-in field updates if client sent new data
      if (name || brand || nutrition) {
        const updated = await prisma.product.update({
          where: { upc },
          data: {
            name      : name      ?? undefined,
            brand     : brand     ?? undefined,
            nutrition : nutrition ?? undefined,
          },
        });
        return res.json(updated);
      }
      return res.json(existing);
    }

    /* ------------------------------------------------------------
     * Case 2 → need to build createData
     * ---------------------------------------------------------- */
    let createData = { upc };

    if (name || brand || nutrition) {
      // client supplied at least one field → trust it
      createData = {
        ...createData,
        name      : name      || 'Unknown',
        brand     : brand     || null,
        nutrition : nutrition || null,
      };
    } else {
      // pull from Open Food Facts
      const resp = await fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`);
      if (!resp.ok) throw new Error('openfoodfacts lookup failed');
      const data = await resp.json();

      if (data.status !== 1) {
        return res.status(404).json({ error: 'Product not found in external DB' });
      }

      const info = data.product;
      createData = {
        ...createData,
        name      : info.product_name || 'Unknown',
        brand     : Array.isArray(info.brands_tags) ? info.brands_tags[0] : null,
        nutrition : info.nutriments || null,
      };
    }

    /* ------------------------------------------------------------
     * Create (no races because UPC is still unique)
     * ---------------------------------------------------------- */
    const product = await prisma.product.create({ data: createData });
    res.status(201).json(product);
  } catch (err) {
    // Unique race fallback: if someone created in the meantime, just return it
    if (err.code === 'P2002') {
      const product = await prisma.product.findUnique({ where: { upc: req.body.upc } });
      return res.json(product);
    }
    next(err);
  }
});

export default router;
