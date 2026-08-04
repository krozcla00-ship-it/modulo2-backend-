import { productModel } from "../models/products.model.js";

export async function postProduct(req, res) {

    try{
        const newProduct = await productModel.create(req.body);

        return res.status(200).jso({mensaje: "producto creado correctamente", product: newProduct});
    } catch (error) {
        return res.status(500).json({mensaje: "error al crear el producto", error: error|| error.message});
    }
}

// get

export const getProducts = async (req, res) => {
    try {
        let products = await productModel.find();

        if(products.length === 0){
            return res.status(200).json({mensaje: "no se encontraron productos"});
        }

        return res.status(200).json({mensaje: "productos encontrados", datos: products});

    } catch (error) {

        return res.status(400).json({mensaje: "error al obtener los productos", problem: error|| error.message});
    }
}

// put

export const putProductById = async (request, response) => {


    try {
        let idForPut = request.params.id; 

        let dataForUpdate = request.body; 


        const productUpdated = await productModel.findByIdAndUpdate(idForPut, dataForUpdate);


        if(!productUpdated){
            return response.status(404).json({
                mensaje: 'Lo siento! No se encontró producto para actualizar'
            });
        }

        return response.status(200).json({
            mensaje: 'Se actualizó el producto correctamente',
            datos: productUpdated
        });

        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al actualizar producto',
            problem: error || error.message 
        });
    }
}


// delete

export const deleteProductById = async (request, response) => {

    try {
        let idForDelete = request.params.id;

        await productModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            mensaje: 'Producto eliminado satisfactoriamente'
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al eliminar producto',
            problem: error || error.message 
        });
    }
}