import { useState, useEffect, useContext } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import InputComentario from "../shared/inputs/InputComentario";
import { Context } from "../../context/authContext";
import useEstadoVotoNoticia from "../../hooks/useEstadoVotoNoticia";
import {
  getEstadoVotoNoticiaService,
  getVotosNoticiaService,
  votarNegativoService,
  votarPositivoService,
} from "../../services/NoticiasService";
import useVotosNoticia from "../../hooks/useVotosNoticia";

export const Noticia = ({ noticia, loadNoticias }) => {
  const { user } = useContext(Context);
  const [comentarios, setComentarios] = useState([]);

  const [estadoVoto, setEstadoVoto] = useState("");
  const { estadoVotoInicial, loading } = useEstadoVotoNoticia(
    noticia.noticia.id,
    user
  );

  const { votosInicial, loadingVotos } = useVotosNoticia(noticia.noticia.id);

  const [votosPositivos, setVotosPositivos] = useState(
    votosInicial.votosPositivos
  );
  const [votosNegativos, setVotosNegativos] = useState(
    votosInicial.votosNegativos
  );

  useEffect(() => {
    if (!loadingVotos) {
      setVotosPositivos(votosInicial.data.votosPositivos);
      setVotosNegativos(votosInicial.data.votosNegativos);
    }
  }, [loadingVotos, votosInicial]);

  useEffect(() => {
    if (!loading) {
      setEstadoVoto(estadoVotoInicial);
    }
  }, [loading, estadoVotoInicial]);

  const handleVotoPositivo = async (id_noticia, user) => {
    await votarPositivoService(id_noticia, user);
    const data = await getEstadoVotoNoticiaService(id_noticia, user);
    const dataVotos = await getVotosNoticiaService(id_noticia);
    const finalVotos = dataVotos.data.data;
    setEstadoVoto(data.data.message);
    setVotosPositivos(finalVotos.votosPositivos);
    setVotosNegativos(finalVotos.votosNegativos);
  };

  const handleVotoNegativo = async (id_noticia, user) => {
    await votarNegativoService(id_noticia, user);
    const data = await getEstadoVotoNoticiaService(id_noticia, user);
    const dataVotos = await getVotosNoticiaService(id_noticia);
    const finalVotos = dataVotos.data.data;
    setEstadoVoto(data.data.message);
    setVotosPositivos(finalVotos.votosPositivos);
    setVotosNegativos(finalVotos.votosNegativos);
  };

  useEffect(() => {
    // Cargar los comentarios iniciales
    setComentarios(noticia.comentarios);
  }, [noticia.comentarios]);

  const handleComentarioSubmit = (comentario) => {
    // Agregar el nuevo comentario a la lista
    const nuevoComentario = {
      comentario: comentario,
    };
    setComentarios([nuevoComentario, ...comentarios]);
    loadNoticias();
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

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
      <p className="texto-noticia">{noticia.noticia.texto}</p>
      <p>Votos positivos: {votosPositivos}</p>
      <p>Votos negativos: {votosNegativos}</p>
      <div className="botones-votar">
        <button
          className="pulgarArriba"
          onClick={() => {
            handleVotoPositivo(noticia.noticia.id, user);
          }}
        >
          <span style={{ marginRight: "5px" }}>
            <FaThumbsUp />
          </span>
          <p>Me gusta</p>
        </button>

        <button
          className="pulgarAbajo"
          onClick={() => {
            handleVotoNegativo(noticia.noticia.id, user);
          }}
        >
          <span style={{ marginRight: "5px" }}>
            <FaThumbsDown />
          </span>
          <p>No me gusta</p>
        </button>
      </div>
      {loading ? (
        <p>Cargando estado del voto...</p>
      ) : estadoVoto === "Ya has valorado esta noticia positivamente" ? (
        <p className="emoticono">❤️</p>
      ) : estadoVoto === "Ya has valorado esta noticia negativamente" ? (
        <p className="emoticono">🤮</p>
      ) : null}

      <div className="comentarios">
        <h3>Comentarios:</h3>
        <InputComentario
          onSubmit={handleComentarioSubmit}
          onClickInput={handleInputClick}
          onClickButton={handleButtonClick}
          noticiaId={noticia.noticia.id}
        />
        {comentarios.length !== 0 ? (
          <ul className="ul-comentarios">
            {comentarios.map((comentario, index) => (
              <li className="li-comentario" key={index}>
                <p>{comentario.comentario}</p>
                <p>{`Creado por ${
                  comentario.nickName ? comentario.nickName : comentario.nombre
                } (${formatFechaComentario(comentario.created_at)})`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Esta noticia aún no tiene comentarios</p>
        )}
      </div>
    </article>
  );
};
