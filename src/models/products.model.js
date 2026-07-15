import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    
    image:{type: String, required: true}, 
    name: {type: String, required: true},
    category:{type:String, required: false},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    isAvailable: {type: Boolean, required: true},
    onSale: {type: Boolean, default: false},

});