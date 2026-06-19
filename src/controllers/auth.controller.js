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