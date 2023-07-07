import { Link } from "react-router-dom";
import { HeaderLog } from "../../components/header/HeaderLog";
import { Permissions } from "../../components/permisions/Permisions";
import useMisComentarios from "../../hooks/useMisComentarios";
import MisComentariosList from "../../components/comentarios/MisComentariosList";
import { Context } from "../../context/authContext";
import { useContext } from "react";

import "./misComentarios.css";

function MisComentarios() {
  const { user } = useContext(Context);

  const { misComentarios, loadingMisComentarios, errorMisComentarios } =
    useMisComentarios(user, user?.id);

  if (loadingMisComentarios) return <p>Cargando comentarios...</p>;

  return (
    <Permissions>
      <div className="contenedor-mis-comentarios">
        {errorMisComentarios && <p>{errorMisComentarios}</p>}
        <HeaderLog />
        <div className="body-mis-comentarios">
          <div className="return-button">
            <Link to="/noticias/login">
              <button>Volver a noticias</button>
            </Link>
          </div>
          <section className="mis-comentarios">
            {misComentarios.length > 0 ? (
              <MisComentariosList misComentarios={misComentarios} />
            ) : (
              <p className="no-hay-misComentarios">
                Anímate a comentar alguna noticia.
              </p>
            )}
          </section>
        </div>
      </div>
    </Permissions>
  );
}

export default MisComentarios;
