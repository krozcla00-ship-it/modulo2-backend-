import { productModel } from "../models/products.model.js";

// 1. CREAR PRENDA (POST)
export async function postProduct(req, res) {
    try {
        let productData = { ...req.body };


        if (productData.name) {
            productData.slug = req.body.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') 
                .replace(/[\s_-]+/g, '-') 
                .replace(/^-+|-+$/g, ''); 
        }



        const newProduct = await productModel.create(productData);

        return res.status(201).json({
            mensaje: "Prenda de ropa registrada correctamente en el catálogo", 
            product: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al registrar la prenda", 
            error: error || error.message, 
        });
    }
}

// 2. OBTENER CATÁLOGO CON FILTROS AVANZADOS DE MODA (GET)

export const getProducts = async (req, res) => {
    try {
        const { subcategory, size, color, onSale, tag } = req.query;
        let queryFilter = { isAvailable: true }; 


        if (subcategory) queryFilter.subcategory = subcategory;
        if (onSale) queryFilter.onSale = onSale === 'true';
        if (tag) queryFilter.tags = tag;
        

        if (size) queryFilter['variants.size'] = size;
        if (color) queryFilter['variants.color'] = new RegExp(color, 'i'); 


        let products = await productModel.find(queryFilter).sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(200).json({
                mensaje: "No se encontraron prendas con los filtros seleccionados",
                datos: []
            });
        }

        return res.status(200).json({
            mensaje: "Catálogo de ropa recuperado con éxito", 
            total: products.length,
            datos: products
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al obtener el catálogo de productos", 
            problem: error.message
        });
    }
}

// 3. ACTUALIZAR PRENDA COMPLETA (PUT)

export const putProductById = async (request, response) => {
    try {
        let idForPut = request.params.id; 
        let dataForUpdate = request.body; 

        
        if (dataForUpdate.name) {
            dataForUpdate.slug = dataForUpdate.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }

        
        const productUpdated = await productModel.findByIdAndUpdate(
            idForPut, 
            dataForUpdate, 
            { new: true, runValidators: true } 
        );

        if (!productUpdated) {
            return response.status(404).json({
                mensaje: 'No se encontró la prenda solicitada para actualizar'
            });
        }

        return response.status(200).json({
            mensaje: 'Prenda actualizada correctamente en el inventario',
            datos: productUpdated
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al actualizar los datos del producto',
            problem: error.message 
        });
    }
}

// 4. ELIMINAR PRENDA (DELETE)

export const deleteProductById = async (request, response) => {
    try {
        let idForDelete = request.params.id;

        const productDeleted = await productModel.findByIdAndDelete(idForDelete);

        if (!productDeleted) {
            return response.status(404).json({
                mensaje: 'La prenda que intentas eliminar no existe en la base de datos'
            });
        }

        return response.status(200).json({
            mensaje: 'Prenda eliminada satisfactoriamente del catálogo',
            idEliminado: idForDelete
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al eliminar el producto',
            problem: error.message 
        });
    }
}

// 5. CONTROLADOR ESPECIAL: REDUCIR STOCK DE UNA VARIANTE TRAS UNA VENTA (PATCH)

export const updateStockAfterSale = async (req, res) => {
    try {
        const { id } = req.params; 
        const { size, color, quantity } = req.body; 

        
        const product = await productModel.findOneAndUpdate(
            {
                _id: id,
                'variants': {
                    $elemMatch: {
                        size: size,
                        color: color,
                        stock: { $gte: quantity } 
                    }
                }
            },
            {
                $inc: { 'variants.$.stock': -quantity } 
            },
            { new: true }
        );

        if (!product) {
            return res.status(400).json({
                mensaje: "No se pudo procesar la venta. El producto no existe o la variante (talla/color) solicitada no cuenta con stock suficiente."
            });
        }

        return res.status(200).json({
            mensaje: "Inventario de la variante actualizado (Stock reducido)",
            datos: product
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: "Error interno al actualizar el inventario",
            problem: error.message
        });
    }
};