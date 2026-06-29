import { createPost, getPublishedPosts, getPostById } from '../services/post.service.js';

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

export async function list(req, res, next) {
  try {
    const posts = await getPublishedPosts();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: { message: 'Post no encontrado' } });
    }

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}
