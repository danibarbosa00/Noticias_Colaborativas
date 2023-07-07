const joi = require("joi");
const {
  crearComentario,
  borrarComentarioConIdComentario,
  buscarComentariosPorIdComentario,
  buscarMisComentarios,
} = require("../../db/comentarios");
const { buscarNoticiaPorId } = require("../../db/noticias");
const { generateError } = require("../../helpers");

const schemaNuevoComentario = joi.string().min(1).max(1000).required();

const nuevoComentarioNoticia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schemaNuevoComentario.validateAsync(body.comentario);
    const [noticia] = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("¡No existe ninguna noticia con este Id!", 400);
    }
    const { comentario } = body;

    const noticiaId = await crearComentario(req.usuarioId, id, comentario);

    res.send({
      status: "Ok",
      message: `El usuario ${req.usuarioId} ha hecho el comentario ${noticiaId} de la noticia ${id}`,
      data: comentario,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComentariosUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [comentario] = await buscarComentariosPorIdComentario(id);

    if (!comentario) {
      throw generateError("¡No existe el comentario que intentas borrar!");
    }
    if (comentario.usuario_id !== req.usuarioId) {
      throw generateError("¡No tienes permisos para borrar este comentario!");
    }

    await borrarComentarioConIdComentario(id);
    res.send({
      status: "Ok",
      message: `El comentario con id:${id} de la noticia ${comentario.noticias_id} ha sido borrado!`,
    });
  } catch (error) {
    next(error);
  }
};
const schemaUsuarioId = joi.number().positive().required();
const getMisComentarios = async (req, res, next) => {
  try {
    const { id } = req.params;
    await schemaUsuarioId.validateAsync(id);
    const comentarios = await buscarMisComentarios(id);
    if (!comentarios) {
      const error = {
        status: 404,
        message: "Comentarios no encontrados",
      };
      throw error;
    } else
      res.send({
        status: "Ok",
        data: comentarios,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  nuevoComentarioNoticia,
  getMisComentarios,
  deleteComentariosUsuario,
};
