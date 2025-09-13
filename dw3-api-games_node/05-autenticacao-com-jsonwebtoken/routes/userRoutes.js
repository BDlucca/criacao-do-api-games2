import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";


// ENDPOINT para cadastrar um usuario
userRoutes.post("/user", userController.createUser);

// ENDPOIT para logar no usuario
userRoutes.post("/login", userController.loginUser)

export default userRoutes;
