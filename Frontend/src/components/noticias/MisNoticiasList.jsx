import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MiNoticia } from "./MiNoticia";
import { Context } from "../../context/authContext";
import { deleteMisNoticias } from "../../services/NoticiasService";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";

import "./misNoticias.css";

const MisNoticiasList = ({ misNoticias }) => {
  const { user } = useContext(Context);
  const [noticiasBorradas, setNoticiasBorradas] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteMisNoticias(id, user);
      setNoticiasBorradas([...noticiasBorradas, id]);
      swal({
        title: `Se ha borrado la noticia ${id} satisfactoriamente!`,

        icon: "success",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const filtrarNoticias = (noticia) => {
    return !noticiasBorradas.includes(noticia.noticia.id);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const noticiasPerPage = 5;
  const noticiasFiltradas = misNoticias.filter(filtrarNoticias);

  const indexOfLastNoticia = (currentPage + 1) * noticiasPerPage;
  const indexOfFirstNoticia = indexOfLastNoticia - noticiasPerPage;
  const noticiasPaginadas = noticiasFiltradas.slice(
    indexOfFirstNoticia,
    indexOfLastNoticia
  );

  const pageCount = Math.ceil(noticiasFiltradas.length / noticiasPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <>
      <h3>Mis noticias</h3>
      <ul className="ulNoticias">
        {noticiasFiltradas.length > 0 ? (
          noticiasPaginadas.map((miNoticia) => {
            const fecha = new Date(miNoticia.noticia.created_at);
            const fechaFormateada = fecha.toLocaleString();

            return (
              <li key={miNoticia.noticia.id} className="liNoticias">
                <div className="barra-info-noticia">
                  <p>({fechaFormateada})</p>
                </div>
                <MiNoticia miNoticia={miNoticia} />

                <div className="mis-noticias-acciones">
                  <Link
                    to={`/noticias/login/modificarNoticia/${miNoticia.noticia.id}`}
                  >
                    <button>Modificar noticia</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(miNoticia.noticia.id, user)}
                  >
                    Borrar noticia
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="no-hay-misNoticias">
            No tienes noticias creadas{" "}
            <Link to="/noticias/login/crearNoticia">
              <button className="crear-noticia">Crear tu noticia</button>
            </Link>
          </p>
        )}
      </ul>

      {noticiasFiltradas.length > noticiasPerPage && (
        <ReactPaginate
          className="paginate"
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default MisNoticiasList;
