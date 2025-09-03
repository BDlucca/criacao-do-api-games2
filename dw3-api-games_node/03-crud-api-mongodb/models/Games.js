import mongoose from "mongoose";

const gameShema = new mongoose.Schema({
    title: String,
    plataform: String,
    genre: String,
    year: Number,
    price: Number
});

const Game = mongoose.model("Game", gameShema);

export default Game;
