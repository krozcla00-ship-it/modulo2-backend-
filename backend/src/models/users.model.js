import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' }, 
    
    phone: { type: String, trim: true },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    }
}, {
    timestamps: true 
});

export const userModel = mongoose.model('users', userSchema);