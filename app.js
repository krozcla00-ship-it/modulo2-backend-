// importaciones
import express from 'express'
import dotenv from 'dotenv'
import { connectionMongo } from './src/config/dataBase.js';


// configuraciones
const app = express()
dotenv.config()
let port = process.env.PORT;
connectionMongo()

// rutas
app.get('/', (req, res) => {
    res.send('hola desde mi backend')
})

// iniciar servidor
app.listen(port, () => {
    console.log(`servidor activo en http://localhost:${port}`)
})