import { Router } from 'express';
import authRoutes from './auth.routes.js';
import postRoutes from './post.routes.js';
import categoryRoutes from './category.routes.js';


const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/categories', categoryRoutes);

router.get('/health', (req, res) => {
    res.json({ status: 'ok'});
})

export default router;