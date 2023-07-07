import { NavLink } from "react-router-dom";

const LinkNombre = ({ nombre }) => {
  return (
    <NavLink className="linkNombre" to={`/noticias/usuarios/nombre/${nombre}`}>
      {nombre}
    </NavLink>
  );
};

export default LinkNombre;
