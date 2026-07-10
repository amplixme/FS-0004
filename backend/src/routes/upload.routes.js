import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG y WEBP'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter
}).any();

const handleUploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: { message: 'El archivo excede el tamaño máximo permitido de 5MB' } });
      }
      return res.status(400).json({ error: { message: err.message } });
    } else if (err) {
      return res.status(400).json({ error: { message: err.message } });
    }
    
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }

    next();
  });
};

router.post('/', authMiddleware, handleUploadMiddleware, uploadImage);

export default router;
