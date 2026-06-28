import { createPost } from '../services/post.service.js';

export async function create(req, res, next) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    const post = await createPost({
      title,
      content,
      authorId
    });

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}
