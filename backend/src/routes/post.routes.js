import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../schemas/post.schema.js';
import { create, list, getById, update, remove } from '../controllers/post.controller.js';
import {
  addComment,
  getComments
} from "../controllers/comment.controller.js";

const router = Router();

router.post('/', authMiddleware, validate(createPostSchema), create);
router.get('/', list);
router.get('/:id', getById);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

router.post(
  "/:postId/comments",
  authMiddleware,
  addComment
);


router.get(
  "/:postId/comments",
  getComments
);


export default router;
