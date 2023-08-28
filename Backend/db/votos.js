const { getConnection } = require("./db");

const buscarVotoPorIdNoticiaIdUsuario = async (noticia_id, usuario_id) => {
  let connection;
  try {
    connection = await getConnection();
    const [voto] = await connection.query(
      `SELECT * from votos where id_Usuario = ? AND id_Noticia = ?`,
      [usuario_id, noticia_id]
    );

    return voto;
  } finally {
    if (connection) connection.release();
  }
};

const buscarVotosPorIdNoticia = async (noticia_id) => {
  let connection;
  try {
    connection = await getConnection();
    const [votos] = await connection.query(
      `SELECT * from votos where id_Noticia = ?`,
      [noticia_id]
    );

    return votos;
  } finally {
    if (connection) connection.release();
  }
};

const buscarVotosNoticia = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [noticia] = await connection.query(
      `SELECT votosPositivos, votosNegativos from noticias where id = ?`,
      [id]
    );

    return noticia;
  } finally {
    if (connection) connection.release();
  }
};

const buscarVotoyNoticiaIdNoticiaIdUsuario = async (noticia_id, usuario_id) => {
  let connection;
  try {
    connection = await getConnection();
    const [voto] = await connection.query(
      `select id_voto, id_Usuario, id_Noticia, negativo, positivo from votos left join noticias on votos.id_Noticia = noticias.id where votos.id_Noticia = ? and votos.id_Usuario = ?;`,
      [noticia_id, usuario_id]
    );

    return voto;
  } finally {
    if (connection) connection.release();
  }
};
const buscarVotoIdUsuario = async (usuario_id) => {
  let connection;
  try {
    connection = await getConnection();
    const [voto] = await connection.query(
      `select id_voto from votos left join noticias on votos.id_Noticia = noticias.id where votos.id_Usuario = ?`,
      [usuario_id]
    );

    return voto;
  } finally {
    if (connection) connection.release();
  }
};

const borrarVotosPorUsuarioId = async (usuario_id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `delete from votos where votos.id_Usuario = ?
 `,
      [usuario_id]
    );

    return true;
  } finally {
    if (connection) connection.release();
  }
};

const borrarVotosNoticia = async (noticia_id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`delete from votos where id_Noticia = ?`, [
      noticia_id,
    ]);

    return true;
  } finally {
    if (connection) connection.release();
  }
};

const agregarVoto = async (usuario_id, noticia_id, estado) => {
  let connection;

  try {
    connection = await getConnection();

    const query =
      "INSERT INTO votos (id_Usuario, id_Noticia, estado) VALUES (?, ?, ?)";
    await connection.query(query, [usuario_id, noticia_id, estado]);
  } finally {
    if (connection) connection.release();
  }
};

const cambiarEstadoVoto = async (voto_id, nuevo_estado) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "UPDATE votos SET estado = ? WHERE id_voto = ?";
    await connection.query(query, [nuevo_estado, voto_id]);
  } finally {
    if (connection) connection.release();
  }
};

const sumarPuntosPositivos = async (noticia_id) => {
  let connection;

  try {
    connection = await getConnection();

    const query =
      "UPDATE noticias SET votosPositivos = (votosPositivos + 1) WHERE id = ?";
    await connection.query(query, [noticia_id]);
  } finally {
    if (connection) connection.release();
  }
};

const restarPuntosPositivos = async (noticia_id) => {
  let connection;

  try {
    connection = await getConnection();

    const query =
      "UPDATE noticias SET votosPositivos = (votosPositivos - 1) WHERE id = ?";
    await connection.query(query, [noticia_id]);
  } finally {
    if (connection) connection.release();
  }
};

const sumarPuntosNegativos = async (noticia_id) => {
  let connection;

  try {
    connection = await getConnection();

    const query =
      "UPDATE noticias SET votosNegativos = (votosNegativos + 1) WHERE id = ?";
    await connection.query(query, [noticia_id]);
  } finally {
    if (connection) connection.release();
  }
};

const restarPuntosNegativos = async (noticia_id) => {
  let connection;

  try {
    connection = await getConnection();

    const query =
      "UPDATE noticias SET votosNegativos = (votosNegativos - 1) WHERE id = ?";
    await connection.query(query, [noticia_id]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  agregarVoto,
  cambiarEstadoVoto,
  buscarVotoPorIdNoticiaIdUsuario,
  buscarVotosPorIdNoticia,
  buscarVotosNoticia,
  buscarVotoyNoticiaIdNoticiaIdUsuario,
  borrarVotosNoticia,
  sumarPuntosPositivos,
  restarPuntosPositivos,
  sumarPuntosNegativos,
  restarPuntosNegativos,
  buscarVotoIdUsuario,
  borrarVotosPorUsuarioId,
};
