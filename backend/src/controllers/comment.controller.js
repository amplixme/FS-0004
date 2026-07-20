import {
  createComment,
  getCommentsByPost
} from "../services/comment.service.js";

export async function addComment(req, res) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length < 1) {
      return res.status(400).json({
        message: "El contenido es requerido",
      });
    }

    const comment = await createComment({
      content,
      postId,
      authorId: req.user.id,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);

    if (error.message === "POST_NOT_FOUND") {
      return res.status(404).json({
        message: "Post no encontrado",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getComments(req, res) {
  try {
    const { postId } = req.params;

    const comments = await getCommentsByPost(postId);

    return res.status(200).json(comments);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}
