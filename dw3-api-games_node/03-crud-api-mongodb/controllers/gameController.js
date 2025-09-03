import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

//funcao para listar jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // codigo 200 é ok- requissicao feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
// funcao de cadastrar jogos
const createGame = async (req, res) => {
  try {
    const { title, year, genre, plataform, price } = req.body;
    await gameService.Create(title, year, genre, plataform, price);
    res.sendStatus(201); // codigo 201 (created) : recurso criado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// funçao para deletar jogos

const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gameService.Delete(id);
      res.sendStatus(204); // codigo 204 (NO CONTENT) - Requisicao bem sucedida mas nao ha conteudo para retornar
    } else {
      // se o id nao for valido
      res.status(400).json({ error: "A id enviada é invalida" });
      // codigo 400 (bad request) - requisicao mal formada
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro no servidor." });

    //res.status(500).json({}); -> enviar json junto
    //res.sendStatus(500) -> somento o codigo de status
  }
};

//funçao para alterar jogos
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, genre, plataform, price } = req.body;
      const game = await gameService.Update(id, title, year, genre, plataform, price);
      res.status(200).json({game});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

//funçao para  mostrar um unico jogo
const getOneGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const game = await gameService.getOne(id);
      if (!game) {
        res.status(404).json({ error: "O jogo nao foi encontrado." }); // not found = nao encontrado
      } else {
        res.status(200).json({ game });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é invalida" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { getAllgames, createGame, deleteGame, updateGame, getOneGame };
