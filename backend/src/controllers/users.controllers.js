import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// post

export async function createUser(req, res) {

    try {
        const { name, email, password } = req.body;
        const codedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: codedPassword
        });

        return res.status(200).json({
            mensaje: 'Usuario creado correctamente',
            user: newUser
        });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error al crear un usuario',
            problema: error || error.message
        });
    }
}



    // get


    export async function showUsers(req, res){

        try {

            let users = await userModel.find();

            if (users.length === 0) {
                return res.status(200).json({mensaje: 'No hay usuarios almacenados'
                })
            }

            return res.status(200).json({mensaje: 'Se encontraron usuarios almacenados',
            numeroUsuarios: users.length,
            datos: users
            })

        } catch (error) {
            return res.status(400).json({mensaje: 'Ocurrió un error al mostrar los usuarios',
            problema: error || error.message
            });
        }
    };






    // post 

    export const loginUser = async (req, res) => {

        try {

            const { email, password } = req.body;


            if (!email || !password) {

                return res.status(400).json({mensaje: "Debes proporcionar el correo y la contraseña",
                });
            }

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(401).json({
                mensaje: "Credenciales inválidas",
                });
            }

            const passwordValido = await bcrypt.compare(password, user.password);

            if (!passwordValido) {
                return res.status(401).json({
                    mensaje: "Credenciales inválidas",
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET, 
                { expiresIn: "1h" } 
            );


            return res.status(200).json({mensaje: "Inicio de sesión exitoso", token,
            });

        } catch (error) {

            return res.status(400).json({mensaje: "Ocurrió un error al iniciar sesión",
            problema: error.message || error,
            });
        }
    };