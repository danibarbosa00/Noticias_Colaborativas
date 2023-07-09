import { useContext, useState } from "react";
import { Noticia } from "./Noticia";
import { NoticiaCorta } from "./NoticiaCorta";
import "./noticiasList.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/authContext";
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
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [selectedNoticiaId, setSelectedNoticiaId] = useState(null);
  const handleClick = (noticiaId) => {
    if (selectedNoticiaId === noticiaId) {
      setSelectedNoticiaId(null);
    } else {
      setSelectedNoticiaId(noticiaId);
    }
  };
  const handleClickNombre = () => {
    const nombre = type.subItem;
    navigate(`/usuarios/usuario/nombre/${nombre}`);
  };
  const handleClickNickName = () => {
    const nickName = type.subItem;
    navigate(`/usuarios/usuario/nickName/${nickName}`);
  };
  return noticias.length !== 0 ? (
    <div className="divContenedorNoticias">
      <h3>
        {titulos[type.type]}{" "}
        {(type.subItem && `Noticias de ${type.subItem}`) || ""}
        {user ? (
          type.type === "nickName" ? (
            <button className="enlace-usuario" onClick={handleClickNickName}>
              Perfil del usuario
            </button>
          ) : (
            type.type === "nombre" && (
              <button className="enlace-usuario" onClick={handleClickNombre}>
                Perfil del usuario
              </button>
            )
          )
        ) : (
          (type.type === "nickName" || type.type === "nombre") && (
            <p>Logueate para ver su perfil</p>
          )
        )}
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
