const joi = require("joi");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();
const {
  crearUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  modificarUsuario,
  modificarUsuarioSinFoto,
  borrarUsuarioId,
  buscarUsuarioPorNickName,
  buscarUsuarioPorNombre,
} = require("../../db/usuarios");
const { generateError, crearCarpetaSiNoExiste } = require("../../helpers");
const {
  buscarComentarioPorIdUsuario,
  borrarComentarioConIdComentario,
  borrarComentarioConIdNoticia,
} = require("../../db/comentarios");
const {
  buscarNoticiasPorIdUsuario,
  borrarNoticiaId,
} = require("../../db/noticias");
const {
  borrarVotosNoticia,
  buscarVotoIdUsuario,
  borrarVotosPorUsuarioId,
} = require("../../db/votos");

const schema = joi.object().keys({
  nombre: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(10).required(),
});

const schema2 = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(4).max(10).required(),
});

const nuevoUsuario = async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { nombre, email, password } = body;
    const foto = "fotobase.jpg";
    const usuario = await buscarUsuarioPorEmail(email);
    if (usuario && usuario.email) {
      throw new Error("¡Este email ya está registrado!");
    }
    const id = await crearUsuario(nombre, email, password, foto);
    res.send({
      status: "Ok",
      message: `¡Usuario con id: ${id} creado!`,
      data: { nombre, email },
    });
  } catch (error) {
    next(error);
  }
};

const loginUsuario = async (req, res, next) => {
  try {
    const { body } = req;
    await schema2.validateAsync(body);
    const { email, password } = body;
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw generateError("¡El email o contraseña no existe!", 401);
    }
    console.log("Logeando...");
    const validarPassword = await bcrypt.compare(password, usuario.password);
    if (!validarPassword) {
      throw generateError("¡El email o contraseña no existe!", 401);
    }
    console.log("Creando token...");
    const payload = { id: usuario.id };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });
    const data = {
      token: token,
      usuario: usuario,
    };
    res.send({
      status: "Ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const schemaIdUsuario = joi.number().positive().required();
const schemaUpdateUsuario = joi.object().keys({
  nombre: joi.string().min(2).max(20),
  nickName: joi.string().min(2).max(15),
  email: joi.string().email(),
  foto: joi.string().empty(""),
  biografia: joi.string().min(2).max(300),
  password: joi.string().min(4).max(10),
});

const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schemaIdUsuario.validateAsync(id);
    await schemaUpdateUsuario.validateAsync(body);
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      throw generateError("¡No existe ningún usuario con este Id!", 400);
    }
    if (usuario.id !== req.usuarioId) {
      throw generateError(
        "¡No tienes permisos para modificar este usuario!",
        403
      );
    }
    if (body.nombre) {
      const usuarioEncontrado = await buscarUsuarioPorNombre(body.nombre);
      if (usuarioEncontrado && usuarioEncontrado.nombre) {
        throw generateError("¡Este nombre ya está registrado!", 409);
      }
    }
    if (body.email) {
      const usuarioEncontrado = await buscarUsuarioPorEmail(body.email);
      if (usuarioEncontrado && usuarioEncontrado.email) {
        throw generateError("¡Este email ya está registrado!", 409);
      }
    }
    if (body.nickName) {
      const usuarioEncontrado = await buscarUsuarioPorNickName(body.nickName);
      if (usuarioEncontrado && usuarioEncontrado.nickName) {
        throw generateError("¡Este nickName ya está registrado!", 409);
      }
    }
    if (req.files && req.files.foto) {
      const uploadsDir = path.join(__dirname, "../uploads");
      const usuariosDir = path.join(__dirname, "../uploads/usuarios");
      console.log("Creando directorio para las imágenes...");
      await crearCarpetaSiNoExiste(uploadsDir);
      await crearCarpetaSiNoExiste(usuariosDir);
      console.log("Procesando las imágenes...");
      const dataFoto = sharp(req.files.foto.data);
      dataFoto.resize(1000);
      console.log("Encriptando imágenes...");
      const idIMG = nanoid(10);
      const foto = `${idIMG}.jpg`;
      if (usuario.foto !== "fotobase.jpg") {
        console.log("Eliminando imágenes antiguas...");
        const rutaArchivo = path.resolve(
          __dirname,
          `../uploads/usuarios/${usuario.foto}`
        );
        fs.unlinkSync(rutaArchivo);
      }
      console.log("Guardando info/imágenes nuevas...");
      await modificarUsuario(foto, id, body);
      await dataFoto.toFile(path.join(usuariosDir, foto));
    } else if (body.foto === "" && usuario.foto !== "fotobase.jpg") {
      const rutaArchivo = path.resolve(
        __dirname,
        `../uploads/usuarios/${usuario.foto}`
      );
      fs.unlinkSync(rutaArchivo);
      const fotoBase = "fotobase.jpg";
      await modificarUsuario(fotoBase, id, body);
    } else {
      console.log("Modificando datos...");
      await modificarUsuarioSinFoto(id, body);
    }
    res.send({
      status: "Ok",
      message: "Has modificado con éxito tu perfil",
      newData: body,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      throw generateError("¡No existe el usuario que intentas borrar!");
    }
    if (usuario.id !== req.usuarioId) {
      throw generateError("¡No tienes permisos para borrar este usuario!");
    }
    const comentarios = await buscarComentarioPorIdUsuario(id);
    if (comentarios.length > 0) {
      for (const comentario of comentarios) {
        await borrarComentarioConIdComentario(comentario.id);
      }
    }
    const votosUsuario = await buscarVotoIdUsuario(id);
    if (votosUsuario.length > 0) {
      await borrarVotosPorUsuarioId(id);
    }

    const noticias = await buscarNoticiasPorIdUsuario(id);
    if (noticias && noticias.length > 0) {
      for (const noticia of noticias) {
        await borrarVotosNoticia(noticia.id);
        await borrarComentarioConIdNoticia(noticia.id);
        if (noticia.foto) {
          const rutaArchivo = path.resolve(
            __dirname,
            `../uploads/noticias/${noticia.foto}`
          );
          await fs.unlink(rutaArchivo);
        }
        await borrarNoticiaId(noticia.id);
      }
    }
    if (usuario.foto !== "fotobase.jpg") {
      const rutaArchivo = path.resolve(
        __dirname,
        `../uploads/usuarios/${usuario.foto}`
      );
      await fs.unlink(rutaArchivo);
    }
    await borrarUsuarioId(id);
    res.send({
      status: "Ok",
      message: `¡El usuario con id: ${id} y sus comentarios, noticias asociadas han sido borrados exitosamente!`,
    });
  } catch (error) {
    next(error);
  }
};

const getUsuarioNickName = async (req, res, next) => {
  try {
    const { nickName } = req.params;
    if (nickName) {
      const usuario = await buscarUsuarioPorNickName(nickName);
      if (usuario === undefined || usuario.length === 0) {
        const error = {
          status: 404,
          message: "No hay usuario con este nickName",
        };
        throw error;
      } else {
        res.send({
          status: "Ok",
          data: usuario,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getUsuarioNombre = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    if (nombre) {
      const usuario = await buscarUsuarioPorNombre(nombre);
      console.log(usuario);
      if (usuario === undefined || usuario.length === 0) {
        const error = {
          status: 404,
          message: "No hay usuario con este nombre",
        };
        throw error;
      } else {
        res.send({
          status: "Ok",
          data: usuario,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  nuevoUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioNickName,
  getUsuarioNombre,
};
