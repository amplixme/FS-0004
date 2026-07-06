import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost({ title, content, authorId, coverImage }) {
  return prisma.post.create({
    data: {
      title,
      content,
      authorId,
      coverImage
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
  return prisma.post.update({
    where: {
      id: parseInt(id)
    },
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

export async function deletePost(id) {
  return prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  });
}
