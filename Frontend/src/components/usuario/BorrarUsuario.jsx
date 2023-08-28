import { useContext, useState } from "react";
import { deleteUserService } from "../../services/UserService";
import { Context } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import bcrypt from "bcryptjs";

function DeleteUsuario() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const { password, email, id } = user;
  const [deleteUserPassword, setDeleteUserPassword] = useState("");
  const [error, setError] = useState("");
  const [openButton, setOpenButton] = useState(false);

  console.log(password, deleteUserPassword);

  const handleCerrarSesion = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleDeleteUserSubmit = async () => {
    try {
      const isPasswordValid = await bcrypt.compare(
        deleteUserPassword,
        password
      );
      console.log(isPasswordValid);
      if (isPasswordValid === true) {
        await deleteUserService(id, user);
        handleCerrarSesion();
        swal({
          title: `Se ha borrado la cuenta ${email} satisfactoriamente!`,
          icon: "success",
        });
        navigate("/");
      } else {
        setError("La contraseña no coincide.");
      }
    } catch (error) {
      setError("Ha ocurrido un error al verificar la contraseña.");
      console.log(error);
    }
  };

  const handleClickButton = () => {
    setOpenButton(true);
  };

  const handleCancelButton = () => {
    setOpenButton(false);
    setDeleteUserPassword("");
    setError("");
  };

  return (
    <div className="div-delete-usuario">
      {!openButton ? (
        <button
          className="borrarUsuario"
          type="button"
          onClick={handleClickButton}
        >
          Eliminar cuenta
        </button>
      ) : (
        <div className="div-delete-usuario">
          <label htmlFor="deleteUserPassword">
            Introduce tu contraseña para eliminar tu cuenta
          </label>
          <div className="verificar-correo">
            <input
              id="deleteUserPassword"
              name="deleteUserPassword"
              type="password"
              value={deleteUserPassword}
              onChange={(e) => setDeleteUserPassword(e.target.value)}
              placeholder="Escribe tu contraseña"
            />
            {error && <p className="error">{error}</p>}
            <button
              className="borrarUsuario"
              type="button"
              onClick={handleDeleteUserSubmit}
            >
              Eliminar cuenta
            </button>
          </div>
          <button type="button" onClick={handleCancelButton}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteUsuario;
