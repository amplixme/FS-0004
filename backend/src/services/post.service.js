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
