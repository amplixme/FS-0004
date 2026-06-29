import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../schemas/post.schema.js';
import { create, list, getById } from '../controllers/post.controller.js';

const router = Router();

router.post('/', authMiddleware, validate(createPostSchema), create);
router.get('/', list);
router.get('/:id', getById);

export default router;
