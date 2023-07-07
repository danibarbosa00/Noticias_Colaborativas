export const MiNoticia = ({ miNoticia }) => {
  const formatFechaComentario = (fecha) => {
    const fechaObjeto = new Date(fecha);
    const opciones = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return fechaObjeto.toLocaleString("es-ES", opciones);
  };

  return (
    <article>
      <h4>{miNoticia.noticia.titulo}</h4>
      {miNoticia.noticia.foto ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/noticias/${
            miNoticia.noticia.foto
          }`}
          alt="foto-noticia"
        />
      ) : null}
      <p className="entradilla-noticia">{miNoticia.noticia.entradilla}</p>
      <p className="tema-noticia">{miNoticia.noticia.tema}</p>
      <p className="texto-noticia">{miNoticia.noticia.texto}</p>
      <p>Votos Positivos: {miNoticia.noticia.votosPositivos}</p>
      <p>Votos Negativos: {miNoticia.noticia.votosNegativos}</p>
      {miNoticia.NickName ? <p>{miNoticia.noticia.NickName}</p> : null}
      <div className="comentarios">
        <h3>Comentarios:</h3>
        {miNoticia.comentarios.length > 0 ? (
          <ul className="ul-comentarios">
            {miNoticia.comentarios.map((comentario, index) => (
              <li className="li-comentario" key={index}>
                <p>{comentario.comentario}</p>
                <p>{`Creado por ${
                  comentario.nickName ? comentario.nickName : comentario.nombre
                } (${formatFechaComentario(comentario.created_at)})`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tiene comentarios</p>
        )}
      </div>
    </article>
  );
};
