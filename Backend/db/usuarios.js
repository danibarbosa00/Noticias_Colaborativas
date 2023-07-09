const { generateError } = require("../helpers");
const { getConnection } = require("./db");
const bcrypt = require("bcrypt");

const crearUsuario = async (nombre, email, password, foto) => {
  let connection;
  try {
    connection = await getConnection();
    const [existeUserNombre] = await connection.query(
      `SELECT * FROM usuarios WHERE nombre = ?`,
      [nombre]
    );

    if (existeUserNombre.length > 0) {
      throw generateError("Ya existe un usuario con este nombre", 409);
    }

    const [existeUserEmail] = await connection.query(
      `SELECT * FROM usuarios WHERE email = ?`,
      [email]
    );

    if (existeUserEmail.length > 0) {
      throw generateError("Ya existe un usuario con este email", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [nuevoUsuario] = await connection.query(
      `INSERT INTO usuarios (nombre, email, password, foto, nickName) VALUES (?, ?, ?, ?, '')`,
      [nombre, email, passwordHash, foto]
    );

    return nuevoUsuario.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const buscarUsuarioPorEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [[result]] = await connection.query(
      `select * from usuarios where email = ?`,
      [email]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const buscarUsuarioPorId = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [[result]] = await connection.query(
      `SELECT * FROM usuarios where id = ?`,
      [id]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const modificarUsuario = async (foto, id, body) => {
  let connection;
  try {
    const { nombre, nickName, email, biografia, password } = body;
    connection = await getConnection();

    if (foto) {
      const sql4 = "UPDATE usuarios SET foto=? WHERE id = ?";
      await connection.query(sql4, [foto, id]);
    }

    if (body.nombre) {
      const sql1 = "UPDATE usuarios SET nombre=? WHERE id = ?";
      await connection.query(sql1, [nombre, id]);
    }
    if (body.nickName) {
      const sql2 = "UPDATE usuarios SET nickName=? WHERE id = ?";
      await connection.query(sql2, [nickName, id]);
    }
    if (body.email) {
      const sql3 = "UPDATE usuarios SET email=? WHERE id = ?";
      await connection.query(sql3, [email, id]);
    }
    if (body.biografia) {
      const sql5 = "UPDATE usuarios SET biografia=? WHERE id = ?";
      await connection.query(sql5, [biografia, id]);
    }
    if (body.password) {
      const passwordHash = await bcrypt.hash(password, 10);
      const sql6 = "UPDATE usuarios SET password=? WHERE id = ?";
      await connection.query(sql6, [passwordHash, id]);
    }
    return true;
  } finally {
    if (connection) connection.release();
  }
};

const modificarUsuarioSinFoto = async (id, body) => {
  let connection;
  try {
    const { nombre, nickName, email, biografia, password } = body;
    connection = await getConnection();

    if (body.nombre) {
      const sql1 = "UPDATE usuarios SET nombre=? WHERE id = ?";
      await connection.query(sql1, [nombre, id]);
    }
    if (body.nickName) {
      const sql2 = "UPDATE usuarios SET nickName=? WHERE id = ?";
      await connection.query(sql2, [nickName, id]);
    }
    if (body.email) {
      const sql3 = "UPDATE usuarios SET email=? WHERE id = ?";
      await connection.query(sql3, [email, id]);
    }
    if (body.biografia) {
      const sql4 = "UPDATE usuarios SET biografia=? WHERE id = ?";
      await connection.query(sql4, [biografia, id]);
    }
    if (body.password) {
      const passwordHash = await bcrypt.hash(password, 10);
      const sql6 = "UPDATE usuarios SET password=? WHERE id = ?";
      await connection.query(sql6, [passwordHash, id]);
    }
    return true;
  } finally {
    if (connection) connection.release();
  }
};

const borrarUsuarioId = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    return;
  } finally {
    if (connection) connection.release();
  }
};

const buscarUsuarioPorNickName = async (nickName) => {
  let connection;
  try {
    connection = await getConnection();
    const [[result]] = await connection.query(
      `SELECT usuarios.nombre, usuarios.nickName, usuarios.foto, usuarios.biografia FROM usuarios WHERE nickName = ?`,
      [nickName]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const buscarUsuarioPorNombre = async (nombre) => {
  let connection;
  try {
    connection = await getConnection();
    const [[result]] = await connection.query(
      `SELECT usuarios.nombre, usuarios.nickName, usuarios.foto, usuarios.biografia FROM usuarios WHERE nombre = ?`,
      [nombre]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  buscarUsuarioPorNombre,
  crearUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  modificarUsuario,
  modificarUsuarioSinFoto,
  borrarUsuarioId,
  buscarUsuarioPorNickName,
};
