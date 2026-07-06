import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

export async function createCategory(data) {
  return prisma.category.create({
    data
  });
}

export async function updateCategory(id, data) {
  return prisma.category.update({
    where: {
      id: parseInt(id)
    },
    data
  });
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      _count: {
        select: { posts: true }
      }
    }
  });
}

export async function deleteCategory(id) {
  return prisma.category.delete({
    where: {
      id: parseInt(id)
    }
  });
}
