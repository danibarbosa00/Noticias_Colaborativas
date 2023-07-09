const joi = require("joi");
const {
  buscarVotoPorIdNoticiaIdUsuario,
  cambiarEstadoVoto,
  agregarVoto,
  sumarPuntosPositivos,
  restarPuntosNegativos,
  sumarPuntosNegativos,
  restarPuntosPositivos,
  buscarVotosNoticia,
} = require("../../db/votos");
const { generateError } = require("../../helpers");
const { buscarNoticiaPorId } = require("../../db/noticias");

const schemaIdUsuario = joi.number().positive().required();
const getVotosPorIdNoticia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [noticia] = await buscarVotosNoticia(id);
    res.send({
      status: "Ok",
      data: noticia,
    });
  } catch (error) {
    next(error);
  }
};

const comprobarVotoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    await schemaIdUsuario.validateAsync(id);
    const noticia = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("No existe la noticia que buscas.");
    }
    const [voto] = await buscarVotoPorIdNoticiaIdUsuario(id, req.usuarioId);
    let userVoted;
    if (!voto || voto.length === 0) {
      userVoted = "No has valorado esa noticia aún.";
    } else {
      if (voto.estado === 1) {
        userVoted = "Ya has valorado esta noticia positivamente";
      } else if (voto.estado === 0) {
        userVoted = "Ya has valorado esta noticia negativamente";
      }
    }
    res.send({
      status: "Ok",
      message: userVoted,
    });
  } catch (error) {
    next(error);
  }
};

const votarNoticiaPositiva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuarioId;

    const [noticia] = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("¡No existe la noticia que intentas votar!");
    }
    const [voto] = await buscarVotoPorIdNoticiaIdUsuario(id, usuario_id);
    if (!voto) {
      await agregarVoto(usuario_id, id, 1);
      await sumarPuntosPositivos(id);
      res.send({
        status: "Ok",
        message: `¡Noticia con id: ${id} valorada positivamente!`,
      });
    } else {
      if (voto.estado === 1) {
        res.send({
          status: "Ok",
          message: `¡Ya has valorado la noticia con id: ${id} positivamente!`,
        });
      } else {
        await cambiarEstadoVoto(voto.id_voto, 1);
        await restarPuntosNegativos(id);
        await sumarPuntosPositivos(id);
        res.send({
          status: "Ok",
          message: `¡Noticia con id: ${id} valorada positivamente!`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const votarNoticiaNegativa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuarioId;
    const [noticia] = await buscarNoticiaPorId(id);
    if (!noticia) {
      throw generateError("¡No existe la noticia que intentas votar!");
    }
    const [voto] = await buscarVotoPorIdNoticiaIdUsuario(id, usuario_id);
    if (!voto) {
      await agregarVoto(usuario_id, id, 0);
      await sumarPuntosNegativos(id);
      res.send({
        status: "Ok",
        message: `¡Noticia con id: ${id} valorada negativamente!`,
      });
    } else {
      if (voto.estado === 0) {
        res.send({
          status: "Ok",
          message: `¡Ya has valorado la noticia con id: ${id} negativamente!`,
        });
      } else {
        await cambiarEstadoVoto(voto.id_voto, 0);
        await restarPuntosPositivos(id);
        await sumarPuntosNegativos(id);
        res.send({
          status: "Ok",
          message: `¡Noticia con id: ${id} valorada negativamente!`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  comprobarVotoUsuario,
  getVotosPorIdNoticia,
  votarNoticiaNegativa,
  votarNoticiaPositiva,
};
