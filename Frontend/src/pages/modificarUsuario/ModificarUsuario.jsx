import { useContext, useState } from "react";
import { HeaderLog } from "../../components/header/HeaderLog";
import swal from "sweetalert";
import { modifyUserService } from "../../services/UserService";
import {
  EMAIL_REGEX,
  MAX_LENGTH_NAME,
  MAX_LENGTH_NICKNAME,
  MIN_LENGTH_NAME,
  MIN_LENGTH_NICKNAME,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "../../utils/constants";
import { Context } from "../../context/authContext";
import { Permissions } from "../../components/permisions/Permisions";
import { Link, useNavigate } from "react-router-dom";
import { FileUploadUser } from "../../components/shared/fileUpload/FileUploadUser";
import DeleteUsuario from "../../components/usuario/BorrarUsuario";
import "./modificarUsuario.css";
import { useForm } from "react-hook-form";

import "./modificarUsuario.css";

function ModificarUsuario() {
  const navigate = useNavigate();
  const { register } = useForm();
  const { user, setUser } = useContext(Context);
  const { id, nombre, nickName, email, biografia } = user;
  const [values, setValues] = useState({
    nombre: "",
    nickName: "",
    email: "",
    biografia: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [openButtonName, setOpenButtonName] = useState(false);
  const [openButtonEmail, setOpenButtonEmail] = useState(false);
  const [openButtonNickname, setOpenButtonNickName] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState(false);
  const handleCerrarSesion = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("fotoUsuario");
    localStorage.removeItem("id");
    localStorage.removeItem("biografia");
    localStorage.removeItem("nickName");
    setUser(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      values.nombre === "" &&
      values.nickName === "" &&
      values.email === "" &&
      values.biografia === "" &&
      values.password === "" &&
      values.confirmPassword === "" &&
      !selectedFile
    ) {
      setFormError(true);
      return;
    }
    console.log("Sending...");
    const formData = new FormData();
    if (values.nombre !== "") {
      formData.append("nombre", values.nombre);
    }
    if (values.nickName !== "") {
      formData.append("nickName", values.nickName);
    }
    if (values.email !== "") {
      formData.append("email", values.email);
    }
    if (values.biografia !== "") {
      formData.append("biografia", values.biografia);
    }
    if (values.password !== "") {
      if (values.password === values.confirmPassword) {
        formData.append("password", values.password);
      } else {
        setErrorPassword("Las contraseñas no coinciden");
        return;
      }
    }
    if (selectedFile) {
      formData.append("foto", selectedFile);
    }
    try {
      await modifyUserService(id, formData, user);
      handleCancelButtonEmail(true);
      handleCancelButtonName(true);
      handleCancelButtonNickName(true);
      setShowPasswordFields(false);
      swal({
        title: "Cambios aceptados!",
        text: "Inicia sesión de nuevo para aplicarlos.",
        icon: "success",
      });
      handleCerrarSesion();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleClickButtonName = () => {
    setOpenButtonName(true);
  };
  const handleCancelButtonName = () => {
    setOpenButtonName(false);
    setValues((prevValues) => {
      return { ...prevValues, nombre: "" };
    });
  };
  const handleClickButtonEmail = () => {
    setOpenButtonEmail(true);
  };
  const handleCancelButtonEmail = () => {
    setOpenButtonEmail(false);
    setValues((prevValues) => {
      return { ...prevValues, email: "" };
    });
  };
  const handleClickButtonNickName = () => {
    setOpenButtonNickName(true);
  };
  const handleCancelButtonNickName = () => {
    setOpenButtonNickName(false);
    setValues((prevValues) => {
      return { ...prevValues, nickName: "" };
    });
  };
  const handleTogglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };
  return (
    <Permissions>
      <div className="contenedor-modificar-usuario">
        <HeaderLog />
        <div className="return-button">
          <Link to={"/noticias/login"}>
            <button>volver a noticias</button>
          </Link>
        </div>
        <div className="form-modificar-usuario">
          <form className="form-fieldset-usuario" onSubmit={handleSubmit}>
            <fieldset id="modificar-usuario">
              <legend>Modifica aquí tu perfil</legend>
              <div className="cambiar-nombre">
                <label htmlFor="nombre">{nombre || "nombre"}</label>
                {!openButtonName ? (
                  <div>
                    <button
                      id="btn-cambiar-nombre"
                      type="button"
                      onClick={handleClickButtonName}
                    >
                      Cambiar nombre
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      id="input-nombre"
                      placeholder="Escribe aquí tu nuevo nombre"
                      minLength={MIN_LENGTH_NAME}
                      maxLength={MAX_LENGTH_NAME}
                      onChange={handleChange}
                      required
                      value={values.nombre}
                    />
                    <button
                      className="btn-cancelar"
                      type="button"
                      onClick={handleCancelButtonName}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="nickName">{nickName || "NickName"}</label>
                {!openButtonNickname ? (
                  <div className="cambiar-nickName">
                    <button
                      id="btn-cambiar-nickName"
                      type="button"
                      onClick={handleClickButtonNickName}
                    >
                      Cambiar nickname
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      name="nickName"
                      id="input-nickName"
                      placeholder="Escribe aquí tu nuevo nickName"
                      minLength={MIN_LENGTH_NICKNAME}
                      maxLength={MAX_LENGTH_NICKNAME}
                      onChange={handleChange}
                      required
                      value={values.nickName}
                    />
                    <button
                      className="btn-cancelar"
                      type="button"
                      onClick={handleCancelButtonNickName}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              <div className="cambiar-email">
                <label htmlFor="email">{email}</label>
                {!openButtonEmail ? (
                  <div>
                    <button
                      id="btn-cambiar-email"
                      type="button"
                      onClick={handleClickButtonEmail}
                    >
                      Cambiar email
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="input-email"
                      placeholder="Escribe aquí tu nuevo email"
                      {...register("email", {
                        required: true,
                        pattern: EMAIL_REGEX,
                      })}
                      onChange={handleChange}
                      required
                      value={values.email}
                    />
                    <button
                      className="btn-cancelar"
                      type="button"
                      onClick={handleCancelButtonEmail}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              <div className="cambiar-biografia">
                <label htmlFor="biografia">Biografía:</label>
                <textarea
                  name="biografia"
                  id="input-biografia"
                  rows="4"
                  placeholder={
                    biografia ? biografia : "Aún no tienes biografía"
                  }
                  onChange={handleChange}
                ></textarea>
              </div>
              <p id="form-error-repetido">{error}</p>
            </fieldset>
          </form>
          <div className="div-fotoUsuario">
            <>
              <FileUploadUser
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
            </>
          </div>
          <div className="div-contraseña">
            <button
              className="btn-cambiar-contraseña"
              type="button"
              onClick={handleTogglePasswordFields}
            >
              {showPasswordFields ? "Cancelar" : "Cambiar contraseña"}
            </button>
            {showPasswordFields && (
              <>
                <label className="labelNewPassword" htmlFor="newPassword">
                  Nueva contraseña
                </label>
                <input
                  id="input-newPassword"
                  name="password"
                  type="password"
                  placeholder="Escribe aquí tu nueva contraseña"
                  minLength={MIN_LENGTH_PASSWORD}
                  maxLength={MAX_LENGTH_PASSWORD}
                  onChange={handleChange}
                  required
                />
                <label
                  className="labelConfirmPassword"
                  htmlFor="confirmPassword"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="input-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Escribe de nuevo la contraseña"
                  minLength={MIN_LENGTH_PASSWORD}
                  maxLength={MAX_LENGTH_PASSWORD}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            {errorPassword && <p>{errorPassword}</p>}
          </div>
          <div className="guardar-cambios">
            <button type="submit" onClick={handleSubmit}>
              Guardar cambios
            </button>
          </div>
          {formError && (
            <p id="form-error-empty">Debes rellenar al menos un campo!</p>
          )}
          <DeleteUsuario />
        </div>
      </div>
    </Permissions>
  );
}

export default ModificarUsuario;
