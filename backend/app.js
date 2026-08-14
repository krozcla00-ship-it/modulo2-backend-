// importaciones
import express from 'express'
import dotenv from 'dotenv'
import { connectionMongo } from './src/config/dataBase.js';
import { usersRouter } from './src/routes/users.routes.js';
import { productsRouter } from './src/routes/products.routes.js';

// configuraciones
const app = express()
dotenv.config()
let port = process.env.PORT;
connectionMongo()
app.use(express.json())

// rutas
app.get('/', (req, res) => {
    res.send('hola desde mi backend')
})
app.use('/usuarios', usersRouter)
app.use('/productos', productsRouter)

// iniciar servidor
app.listen(port, () => {
    console.log(`servidor activo en http://localhost:${port}`);
});