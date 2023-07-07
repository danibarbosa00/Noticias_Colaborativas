import { Link } from "react-router-dom";
import { Context } from "../../context/authContext";
import { useContext } from "react";
import "./permisions.css";
export const Permissions = ({ children }) => {
  const { user } = useContext(Context);

  if (!user) {
    return (
      <div className="sinPermiso">
        <h1>No tienes permisos para entrar en esta página</h1>
        <img src="/actividades-prohibidas.jpg" alt="Sin permiso"></img>
        <Link to={"/"}>
          <button>Volver a la página principal</button>
        </Link>
      </div>
    );
  }
  return children;
};
