import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

export async function createCategory(data) {
  const slug = data.slug || slugify(data.name);
  return prisma.category.create({
    data: {
      ...data,
      slug
    }
  });
}

export async function updateCategory(id, data) {
  const updateData = { ...data };
  if (data.name && !data.slug) {
    updateData.slug = slugify(data.name);
  }
  return prisma.category.update({
    where: {
      id
    },
    data: updateData
  });
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({
    where: {
      id
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
      id
    }
  });
}
