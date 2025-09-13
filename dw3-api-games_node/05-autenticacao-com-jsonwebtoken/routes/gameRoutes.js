import express from "express";
const gamesRoutes = express.Router();
import gameController from "../controllers/gameController.js";
// IMPORTANDO O MIDDLEWARE
import Auth from "../middleware/Auth.js";

// a camada de routes sera responsavel por contar os endpoits da api

// endpoit para listar
gamesRoutes.get("/games", Auth.authorization, gameController.getAllgames);

// endpoit para cadastrar
gamesRoutes.post("/games", Auth.authorization, gameController.createGame);

// endpoit para deletar
gamesRoutes.delete("/games/:id", Auth.authorization, gameController.deleteGame);

// endpoit para alterar
gamesRoutes.put("/games/:id", Auth.authorization, gameController.updateGame);

// endpoit para listar um UNICO jogo
gamesRoutes.get("/games/:id", Auth.authorization, gameController.getOneGame);

export default gamesRoutes;
