import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { categorySchema } from '../schemas/category.schema.js';
import { list, create, update, remove } from '../controllers/category.controller.js';

const router = Router();

router.get('/', list);
router.post('/', authMiddleware, requireRole('ADMIN'), validate(categorySchema), create);
router.put('/:id', authMiddleware, requireRole('ADMIN'), validate(categorySchema), update);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), remove);

export default router;
