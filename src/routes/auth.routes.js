import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { registroSchema } from '../schemas/auth.schema.js';
import { registro } from '../controllers/auth.controller.js';

const router = Router();

router.post('/registro', validate(registroSchema), registro);

export default router;