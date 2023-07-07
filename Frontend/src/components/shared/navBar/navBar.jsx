import { useState } from "react";
import Login from "../../../pages/login/Login";
import Register from "../../../pages/register/Register";

import "./navbar.css";

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsModalOpen({ type: "login" });
  };

  const openRegisterModal = () => {
    setIsModalOpen({ type: "register" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginToRegister = () => {
    setIsModalOpen({ type: "register" });
  };

  const handleRegisterToLogin = () => {
    setIsModalOpen({ type: "login" });
  };

  return (
    <div className="login-register-navbar">
      <ul>
        <button id="login" type="button" onClick={openLoginModal}>
          Login
        </button>

        <button id="register" type="button" onClick={openRegisterModal}>
          Register
        </button>
      </ul>
      {isModalOpen?.type === "login" && (
        <div className="modal" id="loginModal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <Login />
            <div className="logueado">
              <p>¿Aún no te has registrado?</p>
              <button type="button" onClick={handleLoginToRegister}>
                Regístrate
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen?.type === "register" && (
        <div className="modal" id="registerModal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <Register handleRegisterToLogin={handleRegisterToLogin} />
            <div className="registrado">
              <p>¿Ya estás registrado?</p>
              <button type="button" onClick={handleRegisterToLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
