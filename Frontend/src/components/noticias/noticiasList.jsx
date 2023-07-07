import { useState } from "react";
import { Noticia } from "./Noticia";
import { NoticiaCorta } from "./NoticiaCorta";
import "./noticiasList.css";

const titulos = {
  ultimas: "Últimas noticias",
  valoradas: "Noticias más valoradas",
  nickName: "",
  nombre: " ",
  tema: "Tema -",
  titulo: "Búsqueda por título -",
  misNoticias: "",
};

const NoticiasList = ({ noticias, loadNoticias, type }) => {
  const [selectedNoticiaId, setSelectedNoticiaId] = useState(null);

  const handleClick = (noticiaId) => {
    if (selectedNoticiaId === noticiaId) {
      setSelectedNoticiaId(null);
    } else {
      setSelectedNoticiaId(noticiaId);
    }
  };

  return noticias.length !== 0 ? (
    <div className="divContenedorNoticias">
      <h3>
        {titulos[type.type]} {type.subItem || ""}
      </h3>
      <ul className="ulNoticias">
        {noticias.map((noticia) => {
          const fecha = new Date(noticia.noticia.created_at);
          const fechaFormateada = fecha.toLocaleString();

          return (
            <li
              key={noticia.noticia.id}
              className={`liNoticias ${
                selectedNoticiaId === noticia.noticia.id ? "selected" : ""
              }`}
            >
              <div className="barra-info-noticia">
                <p>
                  {noticia.noticia.nickName ? (
                    <span
                      className="nickname-nombre-color"
                      onClick={() =>
                        loadNoticias("nickName", noticia.noticia.nickName)
                      }
                    >
                      {noticia.noticia.nickName}
                    </span>
                  ) : (
                    <span
                      className="nickname-nombre-color"
                      onClick={() =>
                        loadNoticias("nombre", noticia.noticia.nombre)
                      }
                    >
                      {noticia.noticia.nombre}
                    </span>
                  )}{" "}
                  ({fechaFormateada})
                </p>

                <button
                  className="desplegableNoticias"
                  onClick={() => handleClick(noticia.noticia.id)}
                >
                  +
                </button>
              </div>
              {selectedNoticiaId === noticia.noticia.id ? (
                <Noticia noticia={noticia} loadNoticias={loadNoticias} />
              ) : (
                <NoticiaCorta noticia={noticia} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <p className="no-hay-noticias">Sé el primero en subir una noticia</p>
  );
};

export default NoticiasList;
