import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string({ required_error: 'El título es obligatorio' })
    .min(1, 'El título no puede estar vacío'),
  content: z.string({ required_error: 'El contenido es obligatorio' })
    .min(1, 'El contenido no puede estar vacío')
});
