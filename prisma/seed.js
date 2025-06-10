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

  const pasta = await prisma.product.upsert({
    where: { upc: '00015800069828' },
    update: {},
    create: { upc: '00015800069828', name: 'Barilla Spaghetti 1 lb' },
  });

  await prisma.pantryItem.create({
    data: {
      userId: user.id,
      productId: pasta.id,
      quantity: 2,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    },
  });

  console.log('Seed completed.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
