import { createPost, getPublishedPosts, getPostById, updatePost, deletePost } from '../services/post.service.js';

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
    const { category } = req.query;
    const posts = await getPublishedPosts({ category });
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

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: { message: 'Post no encontrado' } });
    }

    if (post.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: { message: 'No tienes permiso para modificar este post' } });
    }

    const { title, content, published } = req.body;
    const updated = await updatePost(id, { title, content, published });

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: { message: 'Post no encontrado' } });
    }

    if (post.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: { message: 'No tienes permiso para modificar este post' } });
    }

    await deletePost(id);

    return res.status(200).json({ message: 'Post eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}
