import PropTypes from "prop-types";

import "./index.css";

function InputText({ label, register, errors, registerName }) {
  return (
    <>
      <label>{label}</label>
      <input type="text" {...register} />
      {errors[registerName]?.type === "required" && (
        <span>Este campo es requerido</span>
      )}
      {errors[registerName]?.type === "pattern" && (
        <span>Este email no es válido</span>
      )}
      {errors[registerName]?.type === "maxLength" && (
        <span>Este campo no debe sobrepasar los 20 dígitos</span>
      )}
    </>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  errors: PropTypes.object,
  registerName: PropTypes.string,
};

export default InputText;
