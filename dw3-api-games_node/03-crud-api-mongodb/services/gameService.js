import Game from "../models/Games.js";

// o serviço sera responsavel por conter os metodos de manipulaçao

class gameService {
  //buscando os registros do banco
  async getAll() {
    try {
      const games = await Game.find();
      return games;
    } catch (error) {
      console.log(error);
    }
  }
  // cadastrando registros no banco
  async Create(title, year, genre, plataform, price) {
    try {
      const newGame = new Game({
        title,
        year,
        genre,
        plataform,
        price,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }

  // deletando registros no banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com a id: ${id} foi deletado com sucesso`);
    } catch (error) {
      console.log(error);
    }
  }
  //alterando registro no banco
  async Update(id, title, year, genre, plataform, price) {
    try {
      const game = await Game.findByIdAndUpdate(
        id,
        {
          title,
          year,
          genre,
          plataform,
          price,
        },
        { new: true }
      );
      console.log(`Dados do game com o id: ${id} alterado com sucesso`);
      return game;
    } catch (error) {
      console.log(error);
    }
  }

  //Listando um registro unico
  async getOne(id) {
    try {
      const game = await Game.findOne({ _id: id });
      return game;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new gameService();
