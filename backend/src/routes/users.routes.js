import { registerUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import express from "express";

export const usersRouter = express.Router();

usersRouter.post('/registro', registerUser);
usersRouter.post('/login', loginUser);