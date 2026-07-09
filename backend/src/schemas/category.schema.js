import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre no puede estar vacío')
});
