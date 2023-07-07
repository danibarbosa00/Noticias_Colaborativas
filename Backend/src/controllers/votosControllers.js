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

//Faltaría una cosilla que es que en el front váis a necesitar la info de si el usuario loggeado le ha dado like o no a una noticia. Por ejemplo, cuando ves publicaciones en instagram, el corazón aparece coloreado de rojo si le has dado like previamente. Esta información no la estáis incluyendo en las noticias, entonces no váis a poder mostrarle al usuario si ya le ha dado like a una o no. Para esto hay una solución fácil, pero poco escalable, y una compleja, pero muy óptima. La fácil sería hacer un endpoint "checkIfUserVoted" o algo así, para comprobar si el usuario ya le dio like o no a una noticia. Le mandaríamos el ID de la noticia por params. La difícil os la enseño en algún día práctico, ya que este detalle le falta a todo el mundo en el proyecto

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
