const { getConnection } = require("./db.js");

const crearComentario = async (usuarioId, noticias_id, comentario) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `insert into comentarios (usuario_id, noticias_id, comentario) values (?, ?, ?)`,
      [usuarioId, noticias_id, comentario]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const buscarComentarioPorIdUsuario = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `SELECT * FROM comentarios WHERE usuario_id = ? ORDER BY created_at DESC`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};

const buscarComentariosPorIdNoticia = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `SELECT comentarios.comentario, comentarios.created_at, usuarios.nombre, usuarios.nickName
      FROM comentarios
      INNER JOIN usuarios ON comentarios.usuario_id = usuarios.id
      WHERE comentarios.noticias_id = ?
      ORDER BY comentarios.created_at DESC;`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};
const buscarComentariosPorIdComentario = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `SELECT *
        FROM comentarios
        WHERE id=? ORDER BY created_at DESC;`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};

const borrarComentarioConIdUsuario = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `DELETE FROM comentarios WHERE usuario_id = ?
      ;`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};

const borrarComentarioConIdNoticia = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `DELETE FROM comentarios WHERE noticias_id = ?
      ;`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};

const borrarComentarioConIdComentario = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [comentarios] = await connection.query(
      `DELETE FROM noticias_colaborativas.comentarios WHERE id = ?;`,
      [id]
    );
    return comentarios;
  } finally {
    if (connection) connection.release();
  }
};

const buscarMisComentarios = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT comentarios.comentario,comentarios.id,comentarios.created_at, noticias.titulo,noticias.tema
      FROM comentarios
      LEFT JOIN noticias ON comentarios.noticias_id = noticias.id
      WHERE comentarios.usuario_id = ?`,
      [id]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  crearComentario,
  buscarComentariosPorIdNoticia,
  buscarComentarioPorIdUsuario,
  buscarComentariosPorIdComentario,
  borrarComentarioConIdUsuario,
  borrarComentarioConIdComentario,
  borrarComentarioConIdNoticia,
  buscarMisComentarios,
};
