import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../schemas/post.schema.js';
import { create, list, getById, update, remove } from '../controllers/post.controller.js';

const router = Router();

router.post('/', authMiddleware, validate(createPostSchema), create);
router.get('/', list);
router.get('/:id', getById);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
