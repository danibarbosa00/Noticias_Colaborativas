import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { HeaderLog } from "../../components/header/HeaderLog";
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUploadComponent from "../../components/shared/fileUpload/FileUpload";
import { modificarNoticia } from "../../services/NoticiasService";
import { Permissions } from "../../components/permisions/Permisions";
import { Context } from "../../context/authContext";
import {
  MAX_LENGTH_ENTRADILLA,
  MAX_LENGTH_TEXTO,
  MAX_LENGTH_TITULO,
  MIN_LENGTH_ENTRADILLA,
  MIN_LENGTH_TITULO,
} from "../../utils/constants";

import "./modificarNoticia.css";
import useNoticiaId from "../../hooks/useNoticiaId";

function ModificarNoticia() {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [values, setValues] = React.useState({
    titulo: "",
    entradilla: "",
    tema: "",
    texto: "",
    foto: "",
  });
  const params = useParams();
  const id_noticia = params.id;
  const { NoticiaId } = useNoticiaId(id_noticia);
  const tituloNoticia = NoticiaId?.noticia?.titulo || "";
  const entradillaNoticia = NoticiaId?.noticia?.entradilla || "";
  const textoNoticia = NoticiaId?.noticia?.texto || "";
  const temaNoticia = NoticiaId?.noticia?.tema || "";

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      values.titulo === "" &&
      values.entradilla === "" &&
      values.texto === "" &&
      values.tema === "" &&
      selectedFile === null
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    const formData = new FormData();
    if (values.titulo !== "") {
      formData.append("titulo", values.titulo);
    }
    if (values.entradilla !== "") {
      formData.append("entradilla", values.entradilla);
    }
    if (values.tema !== "") {
      formData.append("tema", values.tema);
    }
    if (values.texto !== "") {
      formData.append("texto", values.texto);
    }
    if (selectedFile) {
      formData.append("foto", selectedFile);
    }
    await modificarNoticia(formData, id_noticia, user);
    swal({
      title: "Has modificado tu noticia con éxito!",
      icon: "success",
    });
    navigate("/noticias/login/misnoticias");
  };

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  function handleTemaChange(evt) {
    const { value } = evt.target;

    const newValues = {
      ...values,
      tema: value,
    };

    setValues(newValues);
  }
  return (
    <Permissions>
      <div className="contenedor-modificar-noticia">
        <HeaderLog />
        <div className="return-button">
          <Link to="/noticias/login">
            <button type="submit">Volver al inicio</button>
          </Link>
        </div>

        <div className="form-modificar">
          <form onSubmit={handleSubmit}>
            <fieldset id="modificar-noticia">
              <legend>Modifica aquí tu noticia</legend>
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                minLength={MIN_LENGTH_TITULO}
                maxLength={MAX_LENGTH_TITULO}
                placeholder={tituloNoticia}
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
              />
              <label htmlFor="entradilla">Entradilla</label>
              <input
                id="entradilla"
                placeholder={entradillaNoticia}
                minLength={MIN_LENGTH_ENTRADILLA}
                maxLength={MAX_LENGTH_ENTRADILLA}
                name="entradilla"
                type="text"
                value={values.entradilla}
                onChange={handleChange}
              />

              <label htmlFor="tema">Tema</label>
              <select
                name="tema"
                defaultValue={temaNoticia}
                onChange={handleTemaChange}
              >
                <option value={temaNoticia} disabled>
                  Actual: {temaNoticia}
                </option>
                <option value="Deportes">Deportes</option>
                <option value="Política">Política</option>
                <option value="Cine y TV">Cine y TV</option>
                <option value="Actualidad">Actualidad</option>
                <option value="Mundo animal">Mundo animal</option>
                <option value="Arte y cultura">Arte y cultura</option>
                <option value="Motor">Motor</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Economía y negocios">Economía y negocios</option>
                <option value="Otros">Otros</option>
              </select>
              <label htmlFor="texto">Texto</label>
              <textarea
                id="texto"
                name="texto"
                type="text"
                placeholder={textoNoticia}
                maxLength={MAX_LENGTH_TEXTO}
                value={values.texto}
                onChange={handleChange}
              />
              <FileUploadComponent
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
              <button type="submit">Modificar</button>
            </fieldset>
            {error && (
              <p className="error-modificar-noticia">
                Debes modificar algún campo.
              </p>
            )}
          </form>
        </div>
      </div>
    </Permissions>
  );
}
export default ModificarNoticia;
