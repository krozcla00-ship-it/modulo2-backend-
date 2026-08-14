import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    // 1. Identificación y SEO
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true }, 

    // 2. Organización y Categorías 
    category: { type: String, ref: 'Category', required: true }, 
    subcategory: { type: String, ref: 'Subcategory', required: true }, 
    tags: [{ type: String, trim: true }], 

    // 3. Galería Multimedia 
    images: {
        type: [{ type: String, required: true }],
        validate: [v => v.length > 0, 'El producto debe tener al menos una imagen']
    }, 

    // 4. Precios y Ofertas
    price: { type: Number, required: true, min: [0, 'El precio no puede ser negativo'] },
    discountPrice: { 
        type: Number, 
        default: null, 
        validate: {
            validator: function(value) {
                if (value === null) return true;
                return value < this.price; 
            },
            message: 'El precio de descuento debe ser menor al precio original'
        }
    }, 
    onSale: { type: Boolean, default: false },

    // 5. Control de Stock por Variación
    variants: {
        type: [{
            size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'Única'] },
            color: { type: String, required: true, trim: true },
            colorHex: { type: String, trim: true }, 
            stock: { type: Number, required: true, min: [0, 'El stock no puede ser negativo'] }
        }],
        validate: [v => v.length > 0, 'El producto debe tener al menos una variante de talla/color']
    },

    // 6. Atributos Específicos de Ropa
    material: { type: String, required: true }, 
    careInstructions: { type: String }, 
    sizeGuideUrl: { type: String },

    // 7. Estado del Producto
    isAvailable: { type: Boolean, default: true },
    isNewArrival: { type: Boolean, default: true }, 

    // 8. Estadísticas e Interacción
    ratings: { type: Number, default: 0, min: 0, max: 5 }, 

    numReviews: { type: Number, default: 0 } 
}, {
    timestamps: true 
});

// para optimizacion de búsquedas y filtrado
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isAvailable: 1 });


export const productModel = mongoose.model('Product', productSchema);
