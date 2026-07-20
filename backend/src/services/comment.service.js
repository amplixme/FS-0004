import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createComment({ content, postId, authorId }) {

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId)
    }
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  return prisma.comment.create({
    data: {
      content,
      postId: parseInt(postId),
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

export async function getCommentsByPost(postId) {
  return prisma.comment.findMany({
    where: {
      postId: parseInt(postId)
    },
    orderBy: {
      createdAt: "desc"
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

export async function getCommentById(id) {
  return prisma.comment.findUnique({
    where: {
      id: parseInt(id)
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

export async function updateComment(id, data) {
  return prisma.comment.update({
    where: {
      id: parseInt(id)
    },
    data,
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });
}

export async function deleteComment(id) {
  return prisma.comment.delete({
    where: {
      id: parseInt(id)
    }
  });
}