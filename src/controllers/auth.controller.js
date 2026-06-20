import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { success } from '../utils/response.js';
import { registerUser } from "../services/auth.service.js";

const prisma = new PrismaClient();

export async function register(req, res, next) {
  try {
    await registerUser(req.body);

    return res.status(201).json({
      message: "Usuario registrado exitosamente", status: 201
    });
    
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            userId: user.id,
            email: user.email,
            name: user.name
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET no está configurado en las variables de entorno');
        }

        const token = jwt.sign(payload, secret, { expiresIn: '24h' });

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        next(error);
    }
};
