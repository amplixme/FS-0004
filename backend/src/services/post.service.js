import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost({ title, content, authorId }) {
  return prisma.post.create({
    data: {
      title,
      content,
      authorId
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
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
      }
    }
  });
}
