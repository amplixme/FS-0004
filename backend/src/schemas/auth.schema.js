import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string({ required_error: 'El nombre es obligatorio' })
	    .min(2, 'El nombre debe tener al menos 2 caracteres'),
	email: z.string({ required_error: 'El email es obligatorio' })
	    .email('El email no es válido'),
	password: z.string({ required_error: 'La contraseña es obligatoria' })
	    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});