const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
const cors = require("cors");
app.use(cors());

const {
  getNoticiaPorId,
  nuevaNoticia,
  updateNoticia,
  deleteNoticia,
  getNoticias,
  getMisNoticias,
  getNoticiasNickName,
  getNoticiasNombre,
  getNoticiasValoradas,
} = require("./src/controllers/noticiasControllers");
const {
  nuevoUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
} = require("./src/controllers/usuariosControllers");
const autentificarUsuario = require("./src/middlewares/autentificacion");
const {
  nuevoComentarioNoticia,
  deleteComentariosUsuario,
  getMisComentarios,
} = require("./src/controllers/comentariosController");
const {
  getVotosPorIdNoticia,
  comprobarVotoUsuario,
  votarNoticiaPositiva,
  votarNoticiaNegativa,
} = require("./src/controllers/votosControllers");
require("dotenv").config();

const port = 3000;
app.use(fileupload());
app.use(express.json());
app.use(express.static("src/uploads"));

//ENDPOINTS PÚBLICOS
app.post("/usuario", nuevoUsuario);
//localhost:3000/login --> LOGIN USUARIO
app.post("/login", loginUsuario);
//localhost:3000/noticias --> RUTA PARA TODAS LAS NOTICIAS
app.get("/noticias", getNoticias);
//localhost:3000/noticias/valoradas --> RUTA PARA LAS NOTICIAS ORDENADAS POR MÁS VALORADAS
app.get("/noticias/valoradas", getNoticiasValoradas);
//localhost:3000/noticias/:id/votos --> RUTA PARA SACAR VOTOS DE UNA NOTICIA
app.get("/noticias/:id/votos", getVotosPorIdNoticia);
//localhost:3000/noticias/:id --> RUTA PARA BUSCAR UNA NOTICIA POR ID DE LA NOTICIA
app.get("/noticias/:id", getNoticiaPorId);
//localhost:3000/noticias/:id --> RUTA PARA BUSCAR UNA NOTICIA POR EL NICKNAME DEL AUTOR O EL NOMBRE
app.get("/noticias/usuarios/nombre/:nombre", getNoticiasNombre);
//localhost:3000/noticias/:id --> RUTA PARA BUSCAR UNA NOTICIA POR EL NICKNAME DEL AUTOR O EL NOMBRE
app.get("/noticias/usuarios/nickName/:nickName", getNoticiasNickName);

///////////////////////////////////////////////////////////////////////

//ENDPOINTS PRIVADOS

app.get("/noticias/login/misnoticias", autentificarUsuario, getMisNoticias);
//localhost:3000/misnoticias--->VER TUS NOTICIAS POR USUARIO ID
app.put("/usuario/:id", autentificarUsuario, updateUsuario);
//localhost:3000/noticias/id/votar-->VOTAR LA NOTICIA POR SU ID
app.delete("/usuario/:id", autentificarUsuario, deleteUsuario);
////localhost:3000/usuario/:id -->BORRAR UN USUARIO
//localhost:3000/noticias --> CREAR NUEVA NOTICIA
app.post("/noticias", autentificarUsuario, nuevaNoticia);
//localhost:3000/noticias/:id --> MODIFICAR UNA NOTICIA POR SU ID
app.put("/noticias/:id", autentificarUsuario, updateNoticia);
//localhost:3000/noticias/:id --> BORRAR UNA NOTICIA POR SU ID
app.delete("/noticias/:id", autentificarUsuario, deleteNoticia);
//localhost:3000/usuario/:id --> MODIFICAR LOS DATOS DE UN USUARIO POR SU ID
app.post(
  "/noticias/:id/votar/positivo",
  autentificarUsuario,
  votarNoticiaPositiva
);
app.post(
  "/noticias/:id/votar/negativo",
  autentificarUsuario,
  votarNoticiaNegativa
);

app.get("/noticias/votos/:id", autentificarUsuario, comprobarVotoUsuario);

//localhost:3000/noticias/:id/comentarios --> NUEVOCOMENTARIO DE UNA NOTICIA POR SU ID
app.post(
  "/noticias/:id/comentarios",
  autentificarUsuario,
  nuevoComentarioNoticia
);
//localhost:3000/noticias/comentario/:id --> BORRAR UN COMENTARIO POR SU ID
app.delete(
  "/noticias/comentarios/:id",
  autentificarUsuario,
  deleteComentariosUsuario
);
//localjost:3000/miscomentarios ---> MIS COMENTARIOS
app.get(
  "/noticias/login/miscomentarios/:id",
  autentificarUsuario,
  getMisComentarios
);
// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Servidor trabajando en el puerto ${port}`);
});
