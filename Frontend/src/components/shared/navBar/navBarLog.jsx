import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import { Context } from "../../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
export function NavBarLog() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(Context);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
  return (
    <div className="navBar-usuario">
      <ul className="info-usuario-header">
        <p id="nombre-usuario-navBar">
          {user.nickName ? user.nickName : user.nombre}
        </p>
        <li className="li-user-icon">
          <button className="user-icon" onClick={handleDropdownToggle}>
            <img
              alt="User Icon"
              src={
                user.fotoUsuario !== "fotobase.jpg"
                  ? `${import.meta.env.VITE_BACKEND_URL}/usuarios/${
                      user.fotoUsuario
                    }`
                  : "/fotobase.jpg"
              }
            />
          </button>
          {isDropdownOpen && (
            <ul className="dropdown">
              <li className="li-perfil">
                <Link to={"/noticias/login/modificarUsuario"}>
                  <FaUser size={30} className="perfil" />
                </Link>
              </li>
              <li className="li-sesion">
                <Link to="/">
                  <FiLogOut
                    className="sesion"
                    size={30}
                    onClick={handleCerrarSesion}
                  />
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
