import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//Prueba
app.get('/', (req, res) => {
    res.json({
        status: 'Ok',
        message: 'Servidor express activo'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});