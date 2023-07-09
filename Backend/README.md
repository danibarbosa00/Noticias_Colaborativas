# ARRANCAR EL PROYECTO:

1. Ejecutar en la terminal el comando `npm install`.
2. Configurar fichero `.env` con nuestras variables.
3. Abrir mySQL y crear base de datos llamada `noticias_colaborativas`.
4. Ejecutar en la terminal el comando `node db/initDB`.
5. Iniciar el servidor ejecutando el comando en la terminal `npm run dev` y listo!

# USUARIOS

_ENDPOINTS PÚBLICOS_

● Registro (Nombre, Email y Password).
POST/usuarios/register
http://localhost:3000/usuario

● Login (Email y Password).
POST/login
http://localhost:3000/login

_ENDPOINTS PRIVADOS_

● Gestión del perfil de usuario (Nombre, Email, Password, Biografía y Foto).
PUT/usuario/:id
http://localhost:3000/usuario/2

# NOTICIAS

_ENDPOINTS PÚBLICOS_

● Visualizar la lista de todas las noticias.
GET/noticias
http://localhost:3000/noticias

● Visualizar una única noticia completa.
GET/noticias/:id
http://localhost:3000/noticias/:id

● Filtrado de las noticias por tema.
GET/noticias/?tema=Problemas
http://localhost:3000/noticias?tema=Problemas

● Ver votos de una noticia.
GET/noticias/:id/votos
http://localhost:3000/noticias/1/votos

_ENDPOINTS PRIVADOS_

● Publicar una nueva noticia (Título, Foto, Entradilla, Texto de la noticia, Tema).
POST/noticias
http://localhost:3000/noticias

● Borrar una noticia publicada por el mismo usuario.
DELETE/noticias/:id
http://localhost:3000/noticias/2

● Editar una noticia publicada por el mismo usuario.
PUT/noticias/:id
http://localhost:3000/noticias/1

● Votar positivamente una noticia.
POST/noticias/:id/votar/positivo
http://localhost:3000/noticias/1/votar/positivo

● Votar negativamente una noticia.
POST/noticias/:id/votar/negativo
http://localhost:3000/noticias/1/votar/negativo

# DEPENDENCIAS

## [dotenv](https://www.npmjs.com/package/dotenv)

Módulo que carga variables desde el fichero .env en el process.env.

## [express](https://www.npmjs.com/package/express)

Express proporciona una capa delgada de características fundamentales de aplicaciones web.

## [mysql2](https://www.npmjs.com/package/mysql2)

Cliente MySQL para Node.js.

## [joi](https://www.npmjs.com/package/joi)

Validación de datos a través de esquemas.

## [bcrypt](https://www.npmjs.com/package/bcrypt)

Módulo optimizado que gestiona la encriptación de password y su comparación.

## [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Implementación del Json Web Token.

## [express-fileupload](https://www.npmjs.com/package/express-fileupload)

Middleware express para subir ficheros.

## [sharp](https://www.npmjs.com/package/sharp)

Gestión de imágenes.

## [crypto](https://www.npmjs.com/package/crypto-js)

Middleware crypto para encriptar y hacer random names.

## [cors](https://www.npmjs.com/package/cors)

Gestión de rutas.

## [nanoid](https://www.npmjs.com/package/nanoid)

Generador de id único.

# DEVDEPENDENCIES

## [nodemon](https://www.npmjs.com/package/nodemon)

Visualización de cambios automáticos en el servidor.
