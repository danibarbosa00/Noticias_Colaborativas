const joi = require("joi");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const {
  buscarNoticiasPorNickNameNombre,
  buscarTodasLasNoticias,
  buscarNoticiaPorId,
  crearNoticia,
  modificarNoticia,
  modificarNoticiaSinFoto,
  borrarNoticiaId,
  crearNoticiaFoto,
  buscarNoticiaPorNickName,
  buscarMisNoticias,
  buscarNoticiaPorNombre,
} = require("../../db/noticias");
const { generateError, crearCarpetaSiNoExiste } = require("../../helpers");
const {
  buscarVotosPorIdNoticia,
  borrarVotosNoticia,
} = require("../../db/votos");
const {
  buscarComentariosPorIdNoticia,
  borrarComentarioConIdNoticia,
} = require("../../db/comentarios");
const { buscarUsuarioPorId } = require("../../db/usuarios");

const schema = joi.object().keys({
  titulo: joi.string().min(5).max(100).required(),
  entradilla: joi.string().min(5).max(200).required(),
  texto: joi.string().min(0).max(1000),
  tema: joi.string().required(),
});

const getNoticias = async (req, res, next) => {
  try {
    const noticias = await buscarTodasLasNoticias(req.query);
    const noticiasConComentarios = [];
    for (const noticia of noticias) {
      const comentarios = await buscarComentariosPorIdNoticia(noticia.id);
      const noticiaConComentarios = {
        noticia,
        comentarios,
      };
      noticiasConComentarios.push(noticiaConComentarios);
    }
    res.send({
      status: "Ok",
      data: noticiasConComentarios,
    });
  } catch (error) {
    next(error);
  }
};

const getNoticiasValoradas = async (req, res, next) => {
  try {
    const noticias = await buscarTodasLasNoticias(req.query);
    const noticiasConComentarios = [];
    for (const noticia of noticias) {
      const comentarios = await buscarComentariosPorIdNoticia(noticia.id);
      const noticiaConComentarios = {
        noticia,
        comentarios,
      };
      noticiasConComentarios.push(noticiaConComentarios);
    }
    const noticiasValoradas = noticiasConComentarios.sort((a, b) => {
      const votosA = a.noticia.votosPositivos - a.noticia.votosNegativos;
      const votosB = b.noticia.votosPositivos - b.noticia.votosNegativos;
      return votosB - votosA;
    });
    res.send({
      status: "Ok",
      data: noticiasValoradas,
    });
  } catch (error) {
    next(error);
  }
};

const schemaId = joi.number().positive().required();
const getNoticiaPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    await schemaId.validateAsync(id);
    const [noticia] = await buscarNoticiaPorId(id);
    const comentarios = await buscarComentariosPorIdNoticia(id);
    if (!noticia) {
      const error = {
        status: 404,
        message: "Noticia no encontrada",
      };
      throw error;
    } else
      res.send({
        status: "Ok",
        data: { noticia, comentarios },
      });
  } catch (error) {
    next(error);
  }
};

const schemaUsuarioId = joi.number().positive().required();
const getMisNoticias = async (req, res, next) => {
  try {
    await schemaUsuarioId.validateAsync(req.usuarioId);
    const noticias = await buscarMisNoticias(req.usuarioId);
    const noticiasAgrupadas = new Map();
    for (const noticia of noticias) {
      const comentarios = await buscarComentariosPorIdNoticia(noticia.id);
      if (noticiasAgrupadas.has(noticia.id)) {
        const comentariosExistentes = noticiasAgrupadas.get(
          noticia.id
        ).comentarios;
        for (const comentario of comentarios) {
          const existeComentario = comentariosExistentes.some(
            (c) => c.id === comentario.id
          );
          if (!existeComentario) {
            comentariosExistentes.push(comentario);
          }
        }
      } else {
        noticiasAgrupadas.set(noticia.id, {
          noticia,
          comentarios,
        });
      }
    }
    const resultado = Array.from(noticiasAgrupadas.values());
    if (!noticiasAgrupadas) {
      const error = {
        status: 404,
        message: "Noticias no encontradas",
      };
      throw error;
    } else {
      res.send({
        status: "Ok",
        data: resultado,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getNoticiasNickName = async (req, res, next) => {
  try {
    const { nickName } = req.params;
    const noticias = await buscarNoticiaPorNickName(nickName);
    const noticiasAgrupadas = new Map();
    for (const noticia of noticias) {
      const comentarios = await buscarComentariosPorIdNoticia(noticia.id);
      if (noticiasAgrupadas.has(noticia.id)) {
        const comentariosExistentes = noticiasAgrupadas.get(
          noticia.id
        ).comentarios;
        for (const comentario of comentarios) {
          const existeComentario = comentariosExistentes.some(
            (c) => c.id === comentario.id
          );
          if (!existeComentario) {
            comentariosExistentes.push(comentario);
          }
        }
      } else {
        noticiasAgrupadas.set(noticia.id, {
          noticia,
          comentarios,
        });
      }
    }
    const resultado = Array.from(noticiasAgrupadas.values());
    if (!noticiasAgrupadas) {
      const error = {
        status: 404,
        message: "Noticias no encontradas",
      };
      throw error;
    } else {
      res.send({
        status: "Ok",
        data: resultado,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getNoticiasNombre = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const noticias = await buscarNoticiaPorNombre(nombre);
    const noticiasAgrupadas = new Map();
    for (const noticia of noticias) {
      const comentarios = await buscarComentariosPorIdNoticia(noticia.id);
      if (noticiasAgrupadas.has(noticia.id)) {
        const comentariosExistentes = noticiasAgrupadas.get(
          noticia.id
        ).comentarios;
        for (const comentario of comentarios) {
          const existeComentario = comentariosExistentes.some(
            (c) => c.id === comentario.id
          );
          if (!existeComentario) {
            comentariosExistentes.push(comentario);
          }
        }
      } else {
        noticiasAgrupadas.set(noticia.id, {
          noticia,
          comentarios,
        });
      }
    }
    const resultado = Array.from(noticiasAgrupadas.values());
    if (resultado.length === 0) {
      const error = {
        status: 404,
        message: "Noticias no encontradas",
      };
      throw error;
    } else {
      res.send({
        status: "Ok",
        data: resultado,
      });
    }
  } catch (error) {
    next(error);
  }
};

const nuevaNoticia = async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    console.log("Esquema validado");
    const usuario = await buscarUsuarioPorId(req.usuarioId);
    let defNoticiaId;
    if (body && typeof body === "object" && Object.keys(body).length > 0) {
      if (req.files && req.files.foto) {
        const uploadsDir = path.join(__dirname, "../uploads");
        const noticiasDir = path.join(__dirname, "../uploads/noticias");
        console.log("Creando directorio para las imágenes...");
        await crearCarpetaSiNoExiste(uploadsDir);
        await crearCarpetaSiNoExiste(noticiasDir);
        console.log("Procesando las imágenes...");
        const dataFoto = sharp(req.files.foto.data);
        dataFoto.resize(1000);
        console.log("Encriptando imágenes...");
        const idIMG = nanoid(10);
        const foto = `${idIMG}.jpg`;
        console.log("Guardando imágenes...");
        await dataFoto.toFile(path.join(noticiasDir, foto));
        const { titulo, entradilla, texto, tema } = body;
        const noticiaId = await crearNoticiaFoto(
          req.usuarioId,
          titulo,
          entradilla,
          texto,
          foto,
          tema
        );
        defNoticiaId = noticiaId;
      } else {
        const { titulo, entradilla, texto, tema } = body;
        const noticiaId = await crearNoticia(
          req.usuarioId,
          titulo,
          entradilla,
          texto,
          tema
        );
        defNoticiaId = noticiaId;
      }
    } else {
      throw generateError("Debes rellenar algún campo!", 204);
    }
    const data = {};
    if (body) {
      data.body = body;
      if (usuario.nickName) {
        body.nickName = usuario.nickName;
      }
      if (req.files && req.files.foto) {
        data.body.foto = req.files.foto.name;
      }
    }
    res.send({
      status: "Ok",
      message: `noticia con id:${defNoticiaId} creada`,
      data: body,
    });
  } catch (error) {
    next(error);
  }
};

const schemaBody = joi.object().keys({
  titulo: joi.string().min(5).max(100),
  entradilla: joi.string().min(5).max(200),
  texto: joi.string().min(0).max(1000),
  tema: joi.string().min(3).max(100),
});
const updateNoticia = async (req, res, next) => {
  try {
    const { id } = req.params;
    await schemaId.validateAsync(id);
    const { body } = req;
    await schemaBody.validateAsync(body);
    const [noticia] = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("¡No existe ninguna noticia con este Id!", 400);
    }
    if (noticia.usuario_id !== req.usuarioId) {
      throw generateError("¡No tienes permisos para modificar esta noticia!");
    }
    if (req.files && req.files.foto) {
      const uploadsDir = path.join(__dirname, "../uploads");
      const noticiasDir = path.join(__dirname, "../uploads/noticias");
      console.log("Creando directorio para las imágenes...");
      await crearCarpetaSiNoExiste(uploadsDir);
      await crearCarpetaSiNoExiste(noticiasDir);
      console.log("Procesando las imágenes...");
      const dataFoto = sharp(req.files.foto.data);
      console.log("Encriptando imágenes...");
      const idIMG = nanoid(10);
      const foto = `${idIMG}.jpg`;
      console.log("Eliminando imágenes antiguas si hay...");
      if (noticia.foto) {
        const rutaArchivo = path.resolve(
          __dirname,
          `../uploads/noticias/${noticia.foto}`
        );
        fs.unlink(rutaArchivo);
      } else {
        console.log("Sin imágenes previas existentes");
      }
      console.log("Guardando info/imágenes nuevas...");
      await modificarNoticia(foto, id, body);
      await dataFoto.toFile(path.join(noticiasDir, foto));
    } else if (
      id &&
      body &&
      typeof body === "object" &&
      Object.keys(body).length > 0
    ) {
      console.log("Modificando datos...");
      await modificarNoticiaSinFoto(id, body);
    } else {
      console.log("El usuario tiene que modificar algún campo");
      throw new Error("Debes modificar algún campo");
    }
    const data = {};
    if (body) {
      data.body = body;
      if (req.files && req.files.foto) {
        data.body.foto = req.files.foto.name;
      }
    }
    res.send({
      status: "Ok",
      message: "Noticia modificada con éxito",
      data: body,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoticia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [noticia] = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("¡No existe la noticia que intentas borrar!");
    }
    if (noticia.usuario_id !== req.usuarioId) {
      throw generateError("¡No tienes permisos para borrar esta noticia!");
    }
    try {
      await borrarComentarioConIdNoticia(noticia.usuario_id);
    } catch (error) {
      console.log("No existen comentarios que borrar de esta noticia");
    }
    const [votos] = await buscarVotosPorIdNoticia(id);
    if (votos) {
      await borrarVotosNoticia(id);
    }
    if (noticia.foto) {
      const rutaArchivo = path.resolve(
        __dirname,
        `../uploads/noticias/${noticia.foto}`
      );
      console.log("Borrando noticia...");
      fs.unlink(rutaArchivo);
      await borrarNoticiaId(id);
      res.send({
        status: "Ok",
        message: `Su noticia con id:${id} ha sido borrada!`,
      });
    } else {
      await borrarNoticiaId(id);
      res.send({
        status: "Ok",
        message: `Su noticia con id:${id} ha sido borrada!`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getNoticiasNickNameNombre = async (req, res, next) => {
  try {
    const { nickName, nombre } = req.params;
    const queryParams = {
      nickName: nickName,
      nombre: nombre,
    };
    const noticias = await buscarNoticiasPorNickNameNombre(queryParams);
    if (noticias.length === 0) {
      const error = {
        status: 404,
        message: "No hay noticias creadas con este nickname o nombre",
      };
      throw error;
    } else {
      res.send({
        status: "Ok",
        data: noticias,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNoticiasNickNameNombre,
  getNoticiasNickName,
  getNoticiasNombre,
  getNoticias,
  getNoticiasValoradas,
  getNoticiaPorId,
  getMisNoticias,
  nuevaNoticia,
  updateNoticia,
  deleteNoticia,
};
