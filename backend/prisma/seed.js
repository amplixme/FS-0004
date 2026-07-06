import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const initialCategories = [
  { name: 'Tecnología', slug: 'tecnologia' },
  { name: 'Diseño', slug: 'diseno' },
  { name: 'Programación', slug: 'programacion' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Opinión', slug: 'opinion' },
];

async function main() {
  console.log('Seeding categories...');
  for (const category of initialCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
