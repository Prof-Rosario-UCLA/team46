import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const pwHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@pantry.pal' },
    update: {},
    create: { email: 'demo@pantry.pal', password: pwHash },
  });

  const pantryHash = await bcrypt.hash('secret123', 10);
  const pantryUser = await prisma.user.upsert({
    where: { email: 'pantryuser@example.com' },
    update: {},
    create: { email: 'pantryuser@example.com', password: pantryHash },
  });

  console.log('User IDs:', user.id, pantryUser.id);

  const protein = await prisma.product.upsert({
    where: { upc: '811620020633' },
    update: {},
    create: { 
      upc: '811620020633', 
      name: 'Core Power Elite Chocolate',
      brand: 'fairlife',
      nutrition: {"fat":3.5,"salt":0.65,"fiber":2,"energy":962,"sodium":0.26,"sugars":7,"calcium":0.9,"fat_100g":0.845,"fat_unit":"g","proteins":42,"fat_value":3.5,"potassium":0.7,"salt_100g":0.157,"salt_unit":"g","trans-fat":0,"fiber_100g":0.483,"fiber_unit":"g","nova-group":4,"salt_value":0.65,"cholesterol":0.015,"energy-kcal":230,"energy_100g":232,"energy_unit":"kcal","fat_serving":3.5,"fiber_value":2,"sodium_100g":0.0628,"sodium_unit":"g","sugars_100g":1.69,"sugars_unit":"g","added-sugars":0,"calcium_100g":0.217,"calcium_unit":"g","energy_value":230,"salt_serving":0.65,"sodium_value":0.26,"sugars_value":7,"calcium_value":0.9,"carbohydrates":9,"fiber_serving":2,"proteins_100g":10.1,"proteins_unit":"g","saturated-fat":2,"energy_serving":962,"potassium_100g":0.169,"potassium_unit":"g","proteins_value":42,"sodium_serving":0.26,"sugars_serving":7,"trans-fat_100g":0,"trans-fat_unit":"g","calcium_serving":0.9,"nova-group_100g":4,"potassium_value":0.7,"trans-fat_value":0,"cholesterol_100g":0.00362,"cholesterol_unit":"g","energy-kcal_100g":55.6,"energy-kcal_unit":"kcal","proteins_serving":42,"added-sugars_100g":0,"added-sugars_unit":"g","cholesterol_value":0.015,"energy-kcal_value":230,"potassium_serving":0.7,"trans-fat_serving":0,"added-sugars_value":0,"carbohydrates_100g":2.17,"carbohydrates_unit":"g","nova-group_serving":4,"saturated-fat_100g":0.483,"saturated-fat_unit":"g","carbohydrates_value":9,"cholesterol_serving":0.015,"energy-kcal_serving":230,"saturated-fat_value":2,"added-sugars_serving":0,"carbohydrates_serving":9,"saturated-fat_serving":2,"energy-kcal_value_computed":239.5,"fruits-vegetables-nuts-estimate-from-ingredients_100g":0,"fruits-vegetables-legumes-estimate-from-ingredients_100g":0,"fruits-vegetables-nuts-estimate-from-ingredients_serving":0,"fruits-vegetables-legumes-estimate-from-ingredients_serving":0}
    },
  });

  await prisma.pantryItem.create({
    data: {
      userId: user.id,
      productId: protein.id,
      quantity: 2,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    },
  });
  await prisma.pantryItem.create({
    data: {
      userId: pantryUser.id,
      productId: protein.id,
      quantity: 2,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    },
  });

  await prisma.goal.upsert({
    where: { userId: user.id },
    update: { kcalDaily: 2000, proteinG: 150 },
    create: { userId: user.id, kcalDaily: 2000, proteinG: 150 },
  });

  await prisma.goal.upsert({
    where: { userId: pantryUser.id },
    update: { kcalDaily: 2500, proteinG: 180 },
    create: { userId: pantryUser.id, kcalDaily: 2500, proteinG: 180 },
  });

  console.log('Seed completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());