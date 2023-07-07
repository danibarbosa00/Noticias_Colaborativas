import PropTypes from "prop-types";

import "./index.css";

function Select({ label, register, errors, children, registerName }) {
  return (
    <>
      <label>{label}</label>
      <select {...register}>{children}</select>
      {errors[registerName]?.type === "required" && (
        <span>Este campo es requerido</span>
      )}
    </>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  errors: PropTypes.obj,
  children: PropTypes.node,
  registerName: PropTypes.string,
};

export default Select;
