const { getConnection } = require("./db.js");

const buscarTodasLasNoticias = async (queryParams) => {
  let connection;
  try {
    connection = await getConnection();
    let SQLQuery = `SELECT noticias.*, usuarios.nickName,usuarios.nombre FROM noticias INNER JOIN usuarios ON noticias.usuario_id=usuarios.id`;
    const { tema, titulo } = queryParams;
    const values = [];
    let clause = "WHERE";
    if (tema) {
      SQLQuery += ` ${clause} noticias.tema LIKE ?`;
      values.push(`%${tema}%`);
      clause = "AND";
    }
    if (titulo) {
      SQLQuery += ` ${clause} noticias.titulo LIKE ?`;
      values.push(`%${titulo}%`);
    }
    SQLQuery += ` ORDER BY created_at DESC`;
    const [result] = await connection.query(SQLQuery, values);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarNoticiaPorNombre = async (nombre) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT noticias.*, usuarios.nombre, comentarios.comentario, comentarios.created_at
      FROM noticias
      LEFT JOIN comentarios ON noticias.id = comentarios.noticias_id
      LEFT JOIN usuarios ON usuarios.id = noticias.usuario_id
      WHERE usuarios.nombre LIKE ?
      ORDER BY noticias.created_at DESC
      `,
      [nombre]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarNoticiaPorNickName = async (nickName) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      ` SELECT noticias.*, usuarios.nickName, comentarios.comentario, comentarios.created_at
      FROM noticias
      LEFT JOIN comentarios ON noticias.id = comentarios.noticias_id
      LEFT JOIN usuarios ON usuarios.id = noticias.usuario_id
      WHERE usuarios.nickName LIKE ?
      ORDER BY noticias.created_at DESC
      `,
      [nickName]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarNoticiaPorId = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT noticias.*, usuarios.nickName FROM noticias INNER JOIN usuarios ON noticias.usuario_id=usuarios.id WHERE noticias.id = ?`,
      [id]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarMisNoticias = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT noticias.*, usuarios.nombre, usuarios.nickName
      FROM noticias
      LEFT JOIN comentarios ON noticias.id = comentarios.noticias_id
      LEFT JOIN usuarios ON noticias.usuario_id = usuarios.id
      WHERE noticias.usuario_id = ?
      ORDER BY noticias.created_at DESC;`,
      [id]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarNoticiasPorIdUsuario = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT noticias.* FROM noticias WHERE usuario_id = ?`,
      [id]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};
const crearNoticia = async (usuarioId, titulo, entradilla, texto, tema) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `insert into noticias (usuario_id, titulo, entradilla, texto, tema, votosPositivos, votosNegativos) values (?, ?, ?, ?, ?, 0, 0)`,
      [usuarioId, titulo, entradilla, texto, tema]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const crearNoticiaFoto = async (
  usuarioId,
  titulo,
  entradilla,
  texto,
  foto,
  tema
) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `insert into noticias (usuario_id, titulo, entradilla, texto, foto, tema, votosPositivos, votosNegativos) values (?, ?, ?, ?, ?, ?, 0, 0)`,
      [usuarioId, titulo, entradilla, texto, foto, tema]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const modificarNoticia = async (foto, id, body) => {
  let connection;
  try {
    const { titulo, entradilla, texto, tema } = body;
    connection = await getConnection();

    if (body.titulo) {
      const sql1 = "update noticias set titulo=? where id =?";
      await connection.query(sql1, [titulo, id]);
    }
    if (body.entradilla) {
      const sql2 = "update noticias set entradilla=? where id =?";
      await connection.query(sql2, [entradilla, id]);
    }
    if (body.texto) {
      const sql3 = "update noticias set texto=? where id =?";
      await connection.query(sql3, [texto, id]);
    }
    if (foto) {
      const sql4 = "update noticias set foto=? where id =?";
      await connection.query(sql4, [foto, id]);
    }
    if (body.tema) {
      const sql5 = "update noticias set tema=? where id =?";
      await connection.query(sql5, [tema, id]);
    }

    return true;
  } finally {
    if (connection) connection.release();
  }
};
const modificarNoticiaSinFoto = async (id, body) => {
  let connection;
  try {
    const { titulo, entradilla, texto, tema } = body;
    connection = await getConnection();

    if (body.titulo) {
      const sql1 = "update noticias set titulo=? where id =?";
      await connection.query(sql1, [titulo, id]);
    }
    if (body.entradilla) {
      const sql2 = "update noticias set entradilla=? where id =?";
      await connection.query(sql2, [entradilla, id]);
    }
    if (body.texto) {
      const sql3 = "update noticias set texto=? where id =?";
      await connection.query(sql3, [texto, id]);
    }
    if (body.tema) {
      const sql5 = "update noticias set tema=? where id =?";
      await connection.query(sql5, [tema, id]);
    }

    return true;
  } finally {
    if (connection) connection.release();
  }
};

const borrarNoticiaId = async (id) => {
  let connection;
  try {
    (connection = await getConnection()),
      await connection.query(`delete from noticias where id=?`, [id]);
    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  buscarNoticiaPorNickName,
  buscarNoticiasPorIdUsuario,
  buscarNoticiaPorNombre,
  buscarTodasLasNoticias,
  buscarNoticiaPorId,
  buscarMisNoticias,
  crearNoticia,
  crearNoticiaFoto,
  modificarNoticia,
  modificarNoticiaSinFoto,
  borrarNoticiaId,
};
