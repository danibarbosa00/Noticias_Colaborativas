import { registerUserService } from "../../services/UserService";
import {
  EMAIL_REGEX,
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_NAME,
  MIN_LENGTH_PASSWORD,
} from "../../utils/constants";
import { useForm } from "react-hook-form";
import { useState } from "react";

import "./register.css";

const Register = ({ handleRegisterToLogin }) => {
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm();
  const handleRegister = async (data) => {
    try {
      await registerUserService(data);
      console.log("Registro exitoso");
      reset();
      handleRegisterToLogin();
    } catch (error) {
      if (error && error.message === "¡Este email ya está registrado!") {
        setError("El email ya está en uso");
      } else if (
        error &&
        error.message === "Ya existe un usuario con este nombre"
      ) {
        setError("El nombre ya está en uso");
      } else {
        console.error("Error:", error);
      }
    }
  };
  const onSubmit = (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return;
    }
    handleRegister(data);
  };
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password === confirmPassword;
  return (
    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label className="labelRegister" htmlFor="nombre">
          Nombre
        </label>
        <input
          className="inputRegister"
          type="text"
          id="nombre"
          minLength={MIN_LENGTH_NAME}
          maxLength={MAX_LENGTH_NAME}
          {...register("nombre", {
            required: true,
          })}
        />
      </div>
      <div className="form-group">
        <label className="labelRegister" htmlFor="email">
          Email
        </label>
        <input
          className="inputRegister"
          type="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: "Ingrese un email válido",
            },
          })}
        />
        {error && <p className="errores-register">{error}</p>}
      </div>
      <div className="form-group">
        <label className="labelRegister" htmlFor="password">
          Contraseña
        </label>
        <input
          className="inputRegister"
          type="password"
          id="password"
          minLength={MIN_LENGTH_PASSWORD}
          maxLength={MAX_LENGTH_PASSWORD}
          {...register("password", {
            required: true,
            minLength: MIN_LENGTH_PASSWORD,
            maxLength: MAX_LENGTH_PASSWORD,
          })}
        />
      </div>
      <div className="form-group">
        <label className="labelRegister" htmlFor="confirmPassword">
          Confirmar contraseña
        </label>
        <input
          className="inputRegister"
          type="password"
          id="confirmPassword"
          minLength={MIN_LENGTH_PASSWORD}
          maxLength={MAX_LENGTH_PASSWORD}
          {...register("confirmPassword", {
            required: true,
            minLength: MIN_LENGTH_PASSWORD,
            maxLength: MAX_LENGTH_PASSWORD,
          })}
        />
      </div>
      {!passwordsMatch && (
        <p className="errores-register">Las contraseñas no coinciden</p>
      )}
      <button className="registrate" type="submit">
        Registrarse
      </button>
    </form>
  );
};

export default Register;
