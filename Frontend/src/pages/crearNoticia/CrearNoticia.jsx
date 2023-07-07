import React, { useContext, useState } from "react";
import "./crearNoticia.css";
import swal from "sweetalert";
import { postNoticia } from "../../services/NoticiasService";
import FileUploadComponent from "../../components/shared/fileUpload/FileUpload";
import { HeaderLog } from "../../components/header/HeaderLog";
import { Link, useNavigate } from "react-router-dom";
import { Permissions } from "../../components/permisions/Permisions";
import { Context } from "../../context/authContext";

import {
  MAX_LENGTH_ENTRADILLA,
  MAX_LENGTH_TEXTO,
  MAX_LENGTH_TITULO,
  MIN_LENGTH_ENTRADILLA,
  MIN_LENGTH_TITULO,
} from "../../utils/constants";

function CrearNoticia() {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [values, setValues] = React.useState({
    titulo: "",
    entradilla: "",
    tema: "",
    texto: "",
  });

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = useState(false);
  const [errorTema, setErrorTema] = useState(false);
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (values.titulo === "" || values.entradilla === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (values.tema === "") {
      setErrorTema(true);
      return;
    } else {
      setErrorTema(false);
    }
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("entradilla", values.entradilla);
    formData.append("tema", values.tema);
    formData.append("texto", values.texto);
    if (selectedFile) {
      formData.append("foto", selectedFile);
    }
    await postNoticia(formData, user);
    swal({
      title: "¡Has creado tu noticia con éxito!",

      icon: "success",
    });
    navigate("/noticias/login");
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
      <div className="contenedor-crear-noticia">
        <HeaderLog />
        <div className="return-button">
          <Link to="/noticias/login">
            <button type="submit">Volver al inicio</button>
          </Link>
        </div>
        <div className="form-crear">
          <form onSubmit={handleSubmit}>
            <fieldset id="crear-noticia">
              <legend>Crea aquí tu noticia</legend>
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                minLength={MIN_LENGTH_TITULO}
                maxLength={MAX_LENGTH_TITULO}
                placeholder="Nuevo título"
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
              />

              <label htmlFor="entradilla">Entradilla</label>
              <input
                id="entradilla"
                minLength={MIN_LENGTH_ENTRADILLA}
                maxLength={MAX_LENGTH_ENTRADILLA}
                placeholder="Nueva entradilla"
                name="entradilla"
                type="text"
                value={values.entradilla}
                onChange={handleChange}
              />

              <label htmlFor="tema">Tema</label>
              <select
                defaultValue="seleccionarTema"
                name="tema"
                onChange={handleTemaChange}
              >
                <option value="seleccionarTema" disabled>
                  Selecciona el tema
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
                placeholder={`Nuevo texto`}
                maxLength={MAX_LENGTH_TEXTO}
                value={values.texto}
                onChange={handleChange}
              />

              <FileUploadComponent
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />

              <button type="submit">Publicar</button>
            </fieldset>
            {error && (
              <p className="error-crear-noticia">
                Por favor, completa todos los campos.
              </p>
            )}

            {!error && errorTema && (
              <p className="error-crear-noticia">Debes elegir un tema.</p>
            )}
          </form>
        </div>
      </div>
    </Permissions>
  );
}
export default CrearNoticia;
