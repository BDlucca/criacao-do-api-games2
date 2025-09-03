import mongoose from "mongoose";

//criando um documneto alinhado
const descriptionSchema = new mongoose.Schema({
  genre: String,
  plataform: String,
  rating: String,
});

const gameShema = new mongoose.Schema({
  title: String,
  year: Number,
  price: Number,
  descriptions: descriptionSchema,
});

const Game = mongoose.model("Game", gameShema);

export default Game;
