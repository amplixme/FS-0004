import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../schemas/auth.schema.js';
import { register, login } from '../controllers/auth.controller.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
