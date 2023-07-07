import { useContext, useState } from "react";
import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "../../utils/constants";
import { Context } from "../../context/authContext";
import { modifyUserService } from "../../services/UserService";
import { Permissions } from "../permisions/Permisions";

function CambiarPassword() {
  const { user } = useContext(Context);
  const { id } = user;

  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const [passwordFormValues, setPasswordFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = passwordFormValues;

    if (newPassword !== confirmPassword) {
      setPasswordError("La confirmación de contraseña no coincide");
      return;
    }

    try {
      await modifyUserService(id, newPassword, user);

      setPasswordFormValues({
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");
      setPasswordFormVisible(false);
    } catch (error) {
      setPasswordError("Ocurrió un error al cambiar la contraseña");
    }
  };

  const togglePasswordForm = () => {
    setPasswordFormVisible(!passwordFormVisible);
  };

  return (
    <Permissions>
      <div>
        {passwordFormVisible ? (
          <div>
            <label htmlFor="newPassword">Nueva contraseña</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordFormValues.newPassword}
              minLength={MIN_LENGTH_PASSWORD}
              maxLength={MAX_LENGTH_PASSWORD}
              onChange={handlePasswordFormChange}
            />
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordFormValues.confirmPassword}
              minLength={MIN_LENGTH_PASSWORD}
              maxLength={MAX_LENGTH_PASSWORD}
              onChange={handlePasswordFormChange}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button
              className="btn-cambiar"
              type="submit"
              onClick={handlePasswordFormSubmit}
            >
              Cambiar Contraseña
            </button>
          </div>
        ) : (
          <button
            className="btn-cambiar"
            type="button"
            onClick={togglePasswordForm}
          >
            Cambiar Contraseña
          </button>
        )}
      </div>{" "}
    </Permissions>
  );
}

export default CambiarPassword;
