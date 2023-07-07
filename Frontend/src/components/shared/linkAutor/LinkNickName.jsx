import { NavLink } from "react-router-dom";

const LinkNickName = ({ nickName }) => {
  return (
    <NavLink
      className="linkNickName"
      to={`/noticias/usuarios/nickName/${nickName}`}
    >
      {nickName}
    </NavLink>
  );
};

export default LinkNickName;
