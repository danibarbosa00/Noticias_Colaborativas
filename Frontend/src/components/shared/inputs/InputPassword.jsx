import PropTypes from "prop-types";

import "./index.css";

function InputPassword({ label, register, errors, registerName }) {
  return (
    <>
      <label>{label}</label>
      <input type="password" {...register} />
      {errors[registerName]?.type === "required" && (
        <span>Este campo es requerido</span>
      )}
      {errors[registerName]?.type === "minLength" && (
        <span>Tu contraseña debería de tener más de dígitos</span>
      )}
    </>
  );
}

InputPassword.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  errors: PropTypes.object,
  registerName: PropTypes.string,
};

export default InputPassword;
