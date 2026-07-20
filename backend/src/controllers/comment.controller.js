import { 
  createComment,
  getCommentsByPost, getCommentById, updateComment, deleteComment
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

export async function update(req, res, next) {
  try {

    const { id } = req.params;

    const comment = await getCommentById(id);

    if (!comment) {
      return res.status(404).json({
        error: {
          message: "Comentario no encontrado"
        }
      });
    }

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({
        error: {
          message: "No tienes permiso para modificar este comentario"
        }
      });
    }

    const { content } = req.body;

    const updated = await updateComment(id, {
      content
    });

    return res.status(200).json(updated);

  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {

    const { id } = req.params;

    const comment = await getCommentById(id);

    if (!comment) {
      return res.status(404).json({
        error: {
          message: "Comentario no encontrado"
        }
      });
    }

    if (
      comment.authorId !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        error: {
          message: "No tienes permiso para eliminar este comentario"
        }
      });
    }

    await deleteComment(id);

    return res.status(200).json({
      message: "Comentario eliminado exitosamente"
    });

  } catch (error) {
    next(error);
  }
}