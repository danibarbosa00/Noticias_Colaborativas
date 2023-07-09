import { Link, useParams } from "react-router-dom";
import { useDatosUsuarioNickname } from "../../hooks/useDatosUsuarioNickName";
import { useDatosUsuarioNombre } from "../../hooks/useDatosUsuarioNombre";
import { HeaderLog } from "../../components/header/HeaderLog";
import "./perfilUsuario.css";
import { Permissions } from "../../components/permisions/Permisions";
export function PerfilUsuarioNombre() {
  const params = useParams();
  const nombre = params.nombre;
  const { datosUsuarioNombre, loadingUsuarioNombre, errorDatosUsuarioNombre } =
    useDatosUsuarioNombre(nombre);
  if (loadingUsuarioNombre) {
    return <p>Cargando datos del usuario...</p>;
  }
  if (errorDatosUsuarioNombre) {
    return <p>{errorDatosUsuarioNombre}</p>;
  }
  return (
    <Permissions>
      <div className="contenedor-perfilUsuario">
        <HeaderLog />
        <div className="return-button">
          <Link to="/noticias/login">
            <button type="submit">Volver al inicio</button>
          </Link>
        </div>
        <div className="perfilUsuario">
          <div className="perfilUsuarioDos">
            <h3>Perfil de Usuario</h3>
            <div className="contenedor-infoPerfilUsuario">
              <p className="datoUsuario">
                <span>Nombre: </span> {datosUsuarioNombre.nombre}
              </p>
              {datosUsuarioNombre.biografia ? (
                <p className="datoUsuario">
                  <span>Biografía: </span> {datosUsuarioNombre.biografia}
                </p>
              ) : null}
            </div>
            <div className="contenedor-foto-perfilUsuario">
              <h4>Foto de usuario</h4>
              <img
                src={
                  datosUsuarioNombre.foto === "fotobase.jpg"
                    ? `/fotobase.jpg`
                    : `${import.meta.env.VITE_BACKEND_URL}/usuarios/${
                        datosUsuarioNombre.foto
                      }`
                }
                alt="foto perfil"
              />
            </div>
          </div>
        </div>
      </div>
    </Permissions>
  );
}
export function PerfilUsuarioNickName() {
  const params = useParams();
  const nickName = params.nickName;
  const {
    datosUsuarioNickName,
    loadingUsuarioNickName,
    errorDatosUsuarioNickName,
  } = useDatosUsuarioNickname(nickName);
  if (loadingUsuarioNickName) {
    return <p>Cargando datos del usuario...</p>;
  }
  if (errorDatosUsuarioNickName) {
    return <p>{errorDatosUsuarioNickName}</p>;
  }
  return (
    <Permissions>
      <div className="contenedor-perfilUsuario">
        <HeaderLog />
        <div className="return-button">
          <Link to="/noticias/login">
            <button type="submit">Volver al inicio</button>
          </Link>
        </div>
        <div className="perfilUsuario">
          <div className="perfilUsuarioDos">
            <h3>Perfil de Usuario</h3>
            <div className="contenedor-infoPerfilUsuario">
              {
                <p className="datoUsuario">
                  <span>Nickname: </span> {datosUsuarioNickName.nickName}
                </p>
              }
              <p className="datoUsuario">
                <span>Nombre: </span> {datosUsuarioNickName.nombre}
              </p>
              {datosUsuarioNickName.biografia ? (
                <p className="datoUsuario">
                  <span>Biografía: </span> {datosUsuarioNickName.biografia}
                </p>
              ) : null}
            </div>
            <div className="contenedor-foto-perfilUsuario">
              <h4>Foto de usuario</h4>
              <img
                src={
                  datosUsuarioNickName.foto === "fotobase.jpg"
                    ? `/fotobase.jpg`
                    : `${import.meta.env.VITE_BACKEND_URL}/usuarios/${
                        datosUsuarioNickName.foto
                      }`
                }
                alt="foto perfil"
              />
            </div>
          </div>
        </div>
      </div>
    </Permissions>
  );
}
