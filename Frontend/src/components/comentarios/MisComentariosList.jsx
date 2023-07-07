import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { MiComentario } from "./MiComentario";
import { Context } from "../../context/authContext";
import { deleteMisComentarios } from "../../services/ComentariosService";

const MisComentariosList = ({ misComentarios }) => {
  const { user } = useContext(Context);
  const [comentariosBorrados, setComentariosBorrados] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteMisComentarios(id, user);
      setComentariosBorrados([...comentariosBorrados, id]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const filtrarComentarios = (comentario) => {
    return !comentariosBorrados.includes(comentario.id);
  };

  const comentariosFiltrados = misComentarios.filter(filtrarComentarios);
  const [currentPage, setCurrentPage] = useState(0);
  const comentariosPerPage = 5; // Número de comentarios por página

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Cálculo del número de páginas
  const indexOfLastComentario = (currentPage + 1) * comentariosPerPage;
  const indexOfFirstComentario = indexOfLastComentario - comentariosPerPage;
  const comentariosPaginados = comentariosFiltrados.slice(
    indexOfFirstComentario,
    indexOfLastComentario
  );

  const pageCount = Math.ceil(comentariosFiltrados.length / comentariosPerPage);

  return (
    <>
      <h3>Mis Comentarios</h3>
      <ul className="ulComentarios">
        {comentariosPaginados.length > 0 ? (
          comentariosPaginados.map((miComentario) => (
            <li className="liComentarios" key={miComentario.id}>
              <MiComentario miComentario={miComentario} />

              <div className="mis-comentarios-acciones">
                <button onClick={() => handleDelete(miComentario.id, user)}>
                  Borrar comentario
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-hay-comentarios">No tienes ningún comentario</p>
        )}
      </ul>
      {comentariosFiltrados.length > comentariosPerPage && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"paginate"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default MisComentariosList;
