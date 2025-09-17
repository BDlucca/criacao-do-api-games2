import express from "express";
import mongoose from "mongoose";
const app = express();
// importando para ser criado
import Game from "./models/Games.js";
import User from "./models/Users.js";
// importando as rotas de games
import gameRoutes from "./routes/gameRoutes.js";
// importando as rotas de usuario
import userRoutes from "./routes/userRoutes.js";

//Configuraçoes do express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", gameRoutes);
app.use("/", userRoutes);

// Iniciando a conexao com o banco de dado mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/api-thegames");

//Rodando a API na porta 4000
const port = process.env.PORT || 4000
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}.`);
});
