import { PrismaClient } from '@prisma/client';
import { success } from '../utils/response.js';

const prisma = new PrismaClient();

export async function registro(req, res, next){
    try {
        const { name, email, password } = req.body;

        const user = await prisma.user.create({
            data: { name, email, password },
        });

        return success(res, { id: user.id, name: user.name, email: user.email });
    }catch(err){
        next(err);
    }
}   