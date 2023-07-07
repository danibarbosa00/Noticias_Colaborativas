import { Link } from "react-router-dom";
import { HeaderLog } from "../../components/header/HeaderLog";
import useNoticias from "../../hooks/useNoticias";
import BuscadorTituloInput from "../../components/shared/inputs/InputSearchTitulo";
import { Button } from "../../components/shared/button/Button";
import { Permissions } from "../../components/permisions/Permisions";
import NoticiasList from "../../components/noticias/noticiasList";
import Clima from "../../components/clima/Clima";
import ReactPaginate from "react-paginate";

import "./noticiasLogueado.css";

function NoticiasLogueado() {
  const {
    noticias,
    loading,
    error,
    loadNoticias,
    currentPage1,
    setCurrentPage1,
  } = useNoticias();

  const misNoticias = noticias.noticias;
  const noticiasPerPage = 5;
  const indexOfLastNoticia1 = (currentPage1 + 1) * noticiasPerPage;
  const indexOfFirstNoticia1 = indexOfLastNoticia1 - noticiasPerPage;
  const currentNoticias = misNoticias.slice(
    indexOfFirstNoticia1,
    indexOfLastNoticia1
  );
  const pageCount = Math.ceil(misNoticias.length / noticiasPerPage);

  const handlePageChange1 = (selected) => {
    setCurrentPage1(selected.selected);
  };
  if (!noticias.noticias && loading) {
    return <p>Cargando noticias...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Permissions>
      <div className="contenedor-homePageLog">
        <HeaderLog />
        <div className="contenedor-log">
          <ul className="contenedor-filtros">
            <li className="ultimas-noticias">
              <Button
                value="Últimas noticias"
                onClick={() => loadNoticias("ultimas")}
              />
            </li>
            <li className="buscador-input">
              <BuscadorTituloInput loadNoticias={loadNoticias} />
            </li>
            <li className="noticias-valoradas">
              <Button
                value="Más valoradas"
                onClick={() => loadNoticias("valoradas")}
              />
            </li>
          </ul>

          <div className="temas-tiempo">
            <Clima />
            <section className="contenedor-temas">
              <Button
                value="Deportes"
                onClick={() => loadNoticias("tema", "Deportes")}
              />
              <Button
                value="Política"
                onClick={() => loadNoticias("tema", "Política")}
              />
              <Button
                value="Hobbies"
                onClick={() => loadNoticias("tema", "Hobbies")}
              />
              <Button
                value="Cine y TV"
                onClick={() => loadNoticias("tema", "Cine y TV")}
              />
              <Button
                value="Actualidad"
                onClick={() => loadNoticias("tema", "Actualidad")}
              />
              <Button
                value="Mundo animal"
                onClick={() => loadNoticias("tema", "Mundo animal")}
              />
              <Button
                value="Arte y cultura"
                onClick={() => loadNoticias("tema", "Arte y cultura")}
              />
              <Button
                value="Motor"
                onClick={() => loadNoticias("tema", "Motor")}
              />
              <Button
                value="Tecnología"
                onClick={() => loadNoticias("tema", "Tecnología")}
              />
              <Button
                value="Economía y negocios"
                onClick={() => loadNoticias("tema", "Economía y negocios")}
              />
              <Button
                value="Otros"
                onClick={() => loadNoticias("tema", "Otros")}
              />
            </section>
          </div>

          <div className="noticias-acciones">
            <ul className="ulAcciones">
              <li>
                <Link to={"/noticias/login/crearNoticia"}>
                  <Button
                    value={"Crear noticia"}
                    className={"crear-noticia-button"}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/noticias/login/misnoticias"}>
                  <Button
                    value={"Mis noticias"}
                    className={"mis-noticias-button"}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/noticias/login/miscomentarios"}>
                  <Button
                    value={"Mis comentarios"}
                    className={"crear-noticia-button"}
                  />
                </Link>
              </li>
            </ul>
          </div>

          <section className="contenedor-noticiasLogueado">
            <NoticiasList
              noticias={currentNoticias}
              type={noticias.type}
              loadNoticias={loadNoticias}
            />
          </section>

          <ReactPaginate
            className="paginate"
            nextLabel={"Siguiente"}
            previousLabel={"Anterior"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange1}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </Permissions>
  );
}

export default NoticiasLogueado;
