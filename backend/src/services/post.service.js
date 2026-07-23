import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost({ title, content, authorId, coverImage, categoryIds = [] }) {
  const data = {
    title,
    content,
    authorId,
    coverImage
  };

  if (categoryIds.length > 0) {
    data.categories = {
      connect: categoryIds.map(id => ({ id }))
    };
  }

  return prisma.post.create({
    data,
    include: {
      author: {
        select: {
          name: true
        }
      },
      categories: true
    }
  });
}

export async function getPublishedPosts({ category } = {}) {
  const where = {
    published: true
  };

  if (category) {
    where.categories = {
      some: {
        slug: category
      }
    };
  }

  return prisma.post.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          name: true
        }
      },
      categories: true
    }
  });
}

export async function getPostById(id) {
  return prisma.post.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      categories: true
    }
  });
}

export async function updatePost(id, data) {
  const updateData = { ...data };
  
  if (updateData.categoryIds) {
    updateData.categories = {
      set: updateData.categoryIds.map(catId => ({ id: catId }))
    };
    delete updateData.categoryIds;
  }

  return prisma.post.update({
    where: {
      id: parseInt(id)
    },
    data: updateData,
    include: {
      author: {
        select: {
          name: true
        }
      },
      categories: true
    }
  });
}

export async function deletePost(id) {
  return prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  });
}
