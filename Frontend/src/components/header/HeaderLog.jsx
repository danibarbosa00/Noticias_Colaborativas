import { NavBarLog } from "../shared/navBar/navBarLog";
import Title from "../shared/title/Title";
import "./header.css";
export const HeaderLog = () => {
  return (
    <header className="header">
      <img className="logo" src="/mundolog.gif" alt="World News" />
      <Title text={"HACK A NEWS"} link={"/noticias/login"} />
      <NavBarLog />
    </header>
  );
};
