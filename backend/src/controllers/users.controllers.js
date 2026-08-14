import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// 1. REGISTRO DE NUEVAS CLIENTAS (POST)

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ status: 'Error', mensaje: 'El correo electrónico ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        return res.status(201).json({
            status: 'Éxito',
            mensaje: 'Clienta registrada correctamente',
            userId: newUser._id
        });

    } catch (error) {
        return res.status(500).json({ status: 'Error', mensaje: 'Error al registrar usuario', error: error.message });
    }
};

// 2. INICIO DE SESIÓN / LOGIN (POST)

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'Error', mensaje: 'Credenciales incorrectas (Correo o contraseña inválidos)' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 'Error', mensaje: 'Credenciales incorrectas (Correo o contraseña inválidos)' });
        }


        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // El token expira en 7 días
        );

        return res.status(200).json({
            status: 'Éxito',
            mensaje: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ status: 'Error', mensaje: 'Error en el inicio de sesión', error: error.message });
    }
};