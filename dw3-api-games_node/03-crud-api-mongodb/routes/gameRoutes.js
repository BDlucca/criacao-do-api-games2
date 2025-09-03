import express from "express";
const gamesRoutes = express.Router();
import gameController from "../controllers/gameController.js";

// a camada de routes sera responsavel por contar os endpoits da api

// endpoit para listar
gamesRoutes.get("/games", gameController.getAllgames);

// endpoit para cadastrar
gamesRoutes.post("/games", gameController.createGame);

// endpoit para deletar
gamesRoutes.delete("/games/:id", gameController.deleteGame);

// endpoit para alterar
gamesRoutes.put("/games/:id", gameController.updateGame);

// endpoit para listar um UNICO jogo
gamesRoutes.get("/games/:id", gameController.getOneGame);

export default gamesRoutes;
