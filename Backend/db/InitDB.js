const { getConnection } = require("./db.js");
require("dotenv").config();

const createDatabase = async () => {
  let connection;

  try {
    connection = await getConnection();

    console.log("Borrando tablas existentes...");
    await connection.query("drop table if exists comentarios");
    await connection.query("drop table if exists votos");
    await connection.query("drop table if exists noticias");
    await connection.query("drop table if exists usuarios");

    console.log("Creando tablas...");
    await connection.query(`
    create table usuarios (
        id int primary key auto_increment,
        nombre varchar(100) not null,
        nickName varchar(50),
        email varchar(100) not null,
        biografia varchar(300),
        foto varchar(100),
        password varchar(100) not null,
        created_at datetime default current_timestamp);
    `);

    await connection.query(`
    create table noticias (
        id int primary key auto_increment,
        usuario_id int not null,
        titulo varchar(100) not null,
        entradilla varchar(200) not null,
        texto varchar(1000) not null,
        foto varchar(100),
        tema varchar(100) not null,
        votosPositivos int,
        votosNegativos int,
        created_at datetime default current_timestamp,
        foreign key (usuario_id) references usuarios(id));
    `);
    await connection.query(`
    create table comentarios (
        id int primary key auto_increment,
        usuario_id int not null,
        noticias_id int not null,
        comentario varchar(1000) not null,
        created_at datetime default current_timestamp,
        foreign key (usuario_id) references usuarios(id),
        foreign key (noticias_id) references noticias(id));
    `);

    await connection.query(`
    create table votos (
      id_voto int not null auto_increment primary key,
      id_Usuario int not null,
      id_Noticia int not null,
      estado tinyint(0),
      foreign key (id_Usuario) references usuarios(id),
      foreign key (id_Noticia) references noticias(id));
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

createDatabase();
