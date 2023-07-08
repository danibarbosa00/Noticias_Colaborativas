import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import "./title.css";

function Title({ text, link }) {
  return (
    <Link className="content" to={link}>
      <h1 className="text_shadows">{text}</h1>
    </Link>
  );
}
Title.propTypes = {
  text: Proptypes.string,
  link: Proptypes.string,
};

export default Title;
