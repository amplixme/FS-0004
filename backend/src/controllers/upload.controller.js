import { uploadImageToCloudinary } from '../services/upload.service.js';

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No se ha subido ningún archivo' } });
    }

    const result = await uploadImageToCloudinary(req.file.buffer);

    return res.status(200).json({
      url: result.secure_url || result.url
    });
  } catch (error) {
    next(error);
  }
}
