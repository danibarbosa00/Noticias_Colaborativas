export const MiComentario = ({ miComentario }) => {
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
      <div className="info-noticia-comentario">
        <p>
          <span className="negrita">Título de la noticia:</span>{" "}
          {miComentario.titulo}
        </p>
        <p>
          <span className="negrita">Tema de la noticia:</span>{" "}
          {miComentario.tema}
        </p>
      </div>
      <div className="info-comentario">
        <p>
          <span className="negrita">Tu comentario:</span>{" "}
          {miComentario.comentario}
        </p>
        <p>
          <span className="negrita">Creado:</span>{" "}
          {formatFechaComentario(miComentario.created_at)}
        </p>
      </div>
    </article>
  );
};
