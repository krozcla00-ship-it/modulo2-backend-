// importaciones
import mongoose from "mongoose";

// conecion base de datos

export async function connectionMongo() {

    try {
        await mongoose.connect(process.env.URI_MONGO)
        console.log('Conexion exitosa a la base de datos');
        
    } catch (error) {
        console.error('Error al conectar a la base de datos', error)
    }
}
