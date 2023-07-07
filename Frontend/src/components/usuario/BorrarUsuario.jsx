import { useContext, useState } from "react";
import { deleteUserService } from "../../services/UserService";
import { Context } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function DeleteUsuario() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const { email, id } = user;

  const [deleteUserEmail, setDeleteUserEmail] = useState("");
  const [error, setError] = useState("");
  const [openButton, setOpenButton] = useState(false);
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
  const handleDeleteUserSubmit = async () => {
    if (deleteUserEmail !== email) {
      setError("El correo electrónico no coincide");
    } else
      try {
        await deleteUserService(id, user);
        handleCerrarSesion();
        swal({
          title: `Se ha borrado la cuenta ${email} satisfactoriamente!`,

          icon: "success",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  };

  const handleClickButton = () => {
    setOpenButton(true);
  };

  const handleCancelButton = () => {
    setOpenButton(false);
    setDeleteUserEmail("");
    setError("");
  };

  return (
    <div className="div-delete-usuario">
      {!openButton ? (
        <button type="button" onClick={handleClickButton}>
          Eliminar cuenta
        </button>
      ) : (
        <div className="div-delete-usuario">
          <label htmlFor="deleteUserEmail">
            Verifica tu correo para eliminar tu cuenta
          </label>
          <div className="verificar-correo">
            <input
              id="deleteUserEmail"
              name="deleteUserEmail"
              type="email"
              value={deleteUserEmail}
              onChange={(e) => setDeleteUserEmail(e.target.value)}
              placeholder="Escribe tu correo electrónico"
            />
            {error && <p className="error">{error}</p>}
            <button type="button" onClick={handleDeleteUserSubmit}>
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
