// server/routes/ai.js

import express from "express";
import { openai } from "../lib/openai.js";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/recipe", requireAuth, async (req, res, next) => {
  try {
    const useSpoiling = req.query.useSpoiling === "true";
    const userId = req.user.id;

    // 1️⃣ Fetch pantry items
    const pantryItems = await prisma.pantryItem.findMany({
      where: { userId },
      include: { product: true }
    });

    // 2️⃣ Build prompt context
    const itemList = pantryItems
      .map(pi => {
        const nut = pi.product.nutrition ?? {};
        return `• ${pi.product.name}: ${nut["energy-kcal_value"] ?? 0} kcal, ` +
               `${nut["proteins_value"] ?? 0}g protein, ` +
               `${nut["carbs_value"] ?? 0}g carbs`;
      })
      .join("\n");

    const systemMessage = {
      role: "system",
      content: "You are a smart cooking assistant."
    };
    const userMessage = {
      role: "user",
      content: `
I have the following pantry items (with nutrition info per serving):
${itemList}

**INSTRUCTIONS:**
• Respond with only a single valid JSON object—no markdown, no commentary.
• The object must have exactly these keys:
  - recipeName (string)
  - ingredients (array of { name, quantity })
  - steps (array of strings)
  - nutritionBreakdown (object):
      - totalCalories (number)
      - totalProtein (number)
      - perIngredient (array of {
          name (string),
          calories (number),
          protein (number)
        })

${useSpoiling
    ? "Prioritize items that will spoil soon."
    : "Use any pantry items available."}
      `.trim()
    };

    // 3️⃣ Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, userMessage]
    });

    const text = completion.choices[0].message.content.trim();

    // 4️⃣ Parse and return proper JSON
    let recipe;
    try {
      recipe = JSON.parse(text);
    } catch{
      return res
        .status(500)
        .json({ error: "Invalid JSON from AI", raw: text });
    }

    // 5️⃣ Send it back
    return res.json(recipe);

  } catch (err) {
    next(err);
  }
});

export default router;
