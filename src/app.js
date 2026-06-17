import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Prueba inicial
app.get('/', (req, res) => {
    res.json({
        status: 'Ok',
        message: 'Servidor express activo'
    })
})

//Middleware de manejo de errores
app.use(errorHandler);

//Server escuchando
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});