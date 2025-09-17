// importando o service
import gameService from "../services/gameService.js";
import userServices from "../services/userServices.js";
import jwt from 'jsonwebtoken'

// IMPORTANDO O DOTENV (variavel de ambiente)
import dotenv from "dotenv"
dotenv.config();

// segredo para token (é recomendado que o segredo esteja nas variaveis de ambiente)
const JWTSecret = process.env.JWTSECRET;

//importando o bcrypt para fazer o hash da senha
import bcrypt from "bcrypt"

// funçao para cadastrar um Usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // vereficar se o usuario ja exsite
    const user = await userServices.getOne(email);
    // se nao houver usuario cadastrado
    if (user == undefined) {
      // aqui sera feito o hash da senha
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)
      //cadastro do usuario 
      await userServices.Create(name, email, hash);
      res.status(201).json({ success: "Usuario cadastrado com suceso" }); // cod.201--> criado
      //se o usuario ja tiver cadastrado 
    }else {
      res.status(409).json({ error : "O usuario informado ja esta informado"})
      // CODIGO 409 (CONFLITO)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // erro interno
  }
};

// funçao para realizar o login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getOne(email);
    if (user != undefined) {
      // fazendo a validaçao da senha (SENHA CORRETA)

      //COMPARANDO O HASH DE SENHA
      const correct = bcrypt.compareSync(password, user.password)
      //SE A SENHA FOR VALIDA
      if(correct){
        //gerando token com JWT
        jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (error, token) => {
          if(error){
            res.status(400).json({error: 'Nao foi possivel gerar o token de autenticaçao.'})
          } else {
            //token gerado com sucesso 
            res.status(200).json({token})
          }
        })
      } else{
        //SENHA INCORRETA
        res.status(401).json({ error: 'Credencias invalidas!'})
        // COD.401: UNAUTHORIZED
      }
    } else {
        res.status(404).json({ error: "USuario nao encontrado"})
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export default { createUser, loginUser, JWTSecret };
