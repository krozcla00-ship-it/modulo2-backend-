import { postProduct } from "../controllers/products.controllers.js";
import { getProducts} from "../controllers/products.controllers.js";
import { putProductById } from "../controllers/products.controllers.js";
import { deleteProductById } from "../controllers/products.controllers.js";
import express from "express";


export const productsRouter = express.Router();


productsRouter.post("/crear", postProduct);
productsRouter.get("/mostrar", getProducts);
productsRouter.put("/actualizar/:id", putProductById);
productsRouter.delete("/eliminar/:id", deleteProductById);