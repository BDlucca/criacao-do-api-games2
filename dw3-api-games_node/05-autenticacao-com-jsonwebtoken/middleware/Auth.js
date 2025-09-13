import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

//FUNÇAO DE AUTENTICAÇOA PARA VEREFICAR SE O USUARIO ESTA EVIANDO O TOKEN E SE ELE É VALIDO
const authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    // dividindo a string do token(para eliminar a palavra bearer)
    const bearer = authToken.split(" ");
    const token = bearer[1];
    // validando o token
    jwt.verify(token, userController.JWTSecret, (error, data) => {
      if (error) {
        res.status(401).json({ error: "Token invalido" });
        //token valido
      } else {
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Acesso nao autorizado. Token invalido" });
  }
};
export default { authorization };
