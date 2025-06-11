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

  const pasta = await prisma.product.upsert({
    where: { upc: '00015800069828' },
    update: {},
    create: { 
      upc: '00015800069828', 
      name: 'Barilla Spaghetti 1 lb',
      brand: 'Barilla',
      nutrition: {
        "energy-kcal_value": 220,
        "proteins_value": 8,
        "carbs_value": 44
      }
    },
  });

  await prisma.pantryItem.create({
    data: {
      userId: user.id,
      productId: pasta.id,
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