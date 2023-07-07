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

# DEVDEPENDENCIES

## [nodemon](https://www.npmjs.com/package/nodemon)

Visualización de cambios automáticos en el servidor.

La colección de Postman mejor metedla en la carpeta docs ✅

Tenéis mal el import de generateError en el middleware de autentificación. En este mismo middleware tenéis que corregir el header, que es authorization con minúsculas ✅

En el controller updateUsuario, incluís el campo foto en la validación del body con Joi, pero la foto nunca llega en el body, llega en req.files, entonces esa validación no os sirve de nada. También deberíais de comprobar que se mande al menos un dato a editar, ya que si el body está vacío y tampoco se manda foto, deberíamos de mandarle un error al cliente diciendo que tiene que mandar algún campo a editar. Todo esto os pasa también al editar una noticia ✅

En los ifs del controller updateUsuario hacéis unas cosas un poco raras. Primero en la línea 92 hacéis destructuring del array de resultados que os da "buscarUsuarioPorId" y guardáis la primera posición en la variable usuario (esto está perfecto), pero luego, en los ifs, volvéis a meter el usuario en un array para comprobar el length de este. Sería mucho más sencillo simplemente hacer if (!usuario) y os ahorráis lo de crear el array y mirar el length. Luego, en el if de la 100 también os sobran los corchetes, porque al hacerlo, estáis accediendo a la propiedad id del array que estáis creando, y ese array nunca va a tener esa propiedad. Debido a este error grave, nunca se va a cumplir el if, así que cualquier usuario va a poder editar el perfil de otra persona

Queda pendiente que generéis nombres aleatorios para las imágenes✅

Sed constantes con la estructura que mandáis en el res.send() y enviad siempre los datos que se crean/actualizan. Por ejemplo, al hacer un updateUsuario habría que mandar los datos del usuario actualizado, o al crear una noticia habría que mandar los datos de la noticia creada. Esto es importante o vais a tener problemas en el front✅

No estáis comprobando que la noticia que se va a eliminar existe. Pasa lo mismo al editar una noticia✅

Si eliminas una noticia que no tiene foto, el servidor rompe completamente. Esto es porque siempre ejecutáis código para eliminar la foto, aunque no exista. Tenéis que comprobar si la noticia tiene foto antes de intentar eliminar el fichero de la foto✅

El getNoticiaPorId debería de darte un error 404 si la noticia no existe, y si existe, enviar en res.data el objetito de la noticia, en vez de un array que tenga dentro el objeto
No estáis comprobando que la noticia existe cuando se intenta votar✅

En el getNoticias y getNoticiasPorId faltaría incluír información sobre el usuario que crea la noticia (como el nombre por ejemplo)✅
En getNoticias y getNoticiasPorId queremos que salga en vez de el nombre salga el nickName✅

Al actualizar una noticia, si no mandas ninguna foto, no te actualiza los demás campos. Esto es porque estáis llamando al repositorio modificarNoticia en la línea 154, dentro de un if que solo se ejecuta si hay una foto✅

Faltaría una cosilla que es que en el front váis a necesitar la info de si el usuario loggeado le ha dado like o no a una noticia. Por ejemplo, cuando ves publicaciones en instagram, el corazón aparece coloreado de rojo si le has dado like previamente. Esta información no la estáis incluyendo en las noticias, entonces no váis a poder mostrarle al usuario si ya le ha dado like a una o no. Para esto hay una solución fácil, pero poco escalable, y una compleja, pero muy óptima. La fácil sería hacer un endpoint "checkIfUserVoted" o algo así, para comprobar si el usuario ya le dio like o no a una noticia. Le mandaríamos el ID de la noticia por params. La difícil os la enseño en algún día práctico, ya que este detalle le falta a todo el mundo en el proyecto✅

unlink fotos si hay req.files (usuariosUpdate) ✅
borrar votos con id noticia cuando borras noticia ✅
copiar update de usuarios a noticias ✅
