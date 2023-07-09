import { NavLink, useParams } from "react-router-dom";
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
      <div>
        <HeaderLog />
        <div className="contenedor-btnPerfilUsuario">
          <NavLink to={"/noticias/login"}>
            <button>Volver a noticias</button>
          </NavLink>
        </div>
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
        <p>Nombre: {datosUsuarioNombre.nombre}</p>
        {datosUsuarioNombre.biografia ? (
          <p>Biografía: {datosUsuarioNombre.biografia}</p>
        ) : null}
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
        <div className="contenedor-btnPerfilUsuario">
          <NavLink to={"/noticias/login"}>
            <button>Volver a noticias</button>
          </NavLink>
        </div>
        <div className="perfilUsuario">
          <div className="perfilUsuarioDos">
            <div className="contenedor-infoPerfilUsuario">
              <p className="datoUsuario">{datosUsuarioNickName.nickName}</p>
              <p className="datoUsuario">
                Nombre: {datosUsuarioNickName.nombre}
              </p>
              {datosUsuarioNickName.biografia ? (
                <p className="datoUsuario">
                  Biografía: {datosUsuarioNickName.biografia}
                </p>
              ) : null}
            </div>
            <div className="contenedor-foto-perfilUsuario">
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
