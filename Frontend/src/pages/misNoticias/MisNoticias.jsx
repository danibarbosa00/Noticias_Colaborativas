import { Link } from "react-router-dom";
import { HeaderLog } from "../../components/header/HeaderLog";
import MisNoticiasList from "../../components/noticias/MisNoticiasList";
import useMisNoticias from "../../hooks/useMisNoticias";

import { useContext } from "react";
import { Context } from "../../context/authContext";
import { Permissions } from "../../components/permisions/Permisions";

import "./misNoticias.css";

function MisNoticias() {
  const { user } = useContext(Context);
  const { misNoticias, loadingMisNoticias, errorMisNoticias } =
    useMisNoticias(user);

  if (loadingMisNoticias) return <p>Cargando noticias...</p>;

  return (
    <Permissions>
      <div className="contenedor-mis-noticias">
        {errorMisNoticias && <p>{errorMisNoticias}</p>}
        <HeaderLog />

        <div className="body-mis-noticias">
          <div className="return-button">
            <Link to="/noticias/login">
              <button>Volver al inicio</button>
            </Link>
          </div>

          <section className="mis-noticias">
            {misNoticias.length > 0 ? (
              <MisNoticiasList misNoticias={misNoticias} />
            ) : (
              <p className="no-hay-misNoticias">Anímate a subir una noticia.</p>
            )}
          </section>
        </div>
      </div>
    </Permissions>
  );
}

export default MisNoticias;
