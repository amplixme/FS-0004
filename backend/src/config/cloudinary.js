import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_URL) {
  console.warn('Warning: CLOUDINARY_URL is not set in environment variables');
}

export { cloudinary };
