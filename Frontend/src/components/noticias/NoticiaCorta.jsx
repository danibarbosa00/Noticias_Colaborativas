export const NoticiaCorta = ({ noticia }) => {
  return (
    <article className="articleNoticias">
      <h4>{noticia.noticia.titulo}</h4>
      {noticia.noticia.foto ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/noticias/${
            noticia.noticia.foto
          }`}
          alt="foto-noticia"
        />
      ) : null}
      <p className="entradilla-noticia">{noticia.noticia.entradilla}</p>
      <p className="tema-noticia">{noticia.noticia.tema}</p>
    </article>
  );
};
