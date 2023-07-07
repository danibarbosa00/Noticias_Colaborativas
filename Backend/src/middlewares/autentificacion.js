const jwt = require("jsonwebtoken");
const { generateError } = require("../../helpers");
require("dotenv").config();

const autentificarUsuario = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Falta la autorización", 401);
    }

    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateError("token incorrecto", 401);
    }

    req.usuarioId = token.id;
    console.log("Usuario validado!");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = autentificarUsuario;
