import { createUser } from "../controllers/users.controllers.js";
import { showUsers } from "../controllers/users.controllers.js"; 
import { loginUser } from "../controllers/users.controllers.js";
import express from "express";

export const usersRouter = express.Router();

usersRouter.post('/registrar', createUser);
usersRouter.get('/mostrar', showUsers);
usersRouter.post('/iniciar-sesion', loginUser);