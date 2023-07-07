import { Navbar } from "../shared/navBar/navBar";
import Title from "../shared/title/Title";
import "./header.css";

export const Header = () => {
  return (
    <header className="header">
      <img className="logo" src="/mundolog.gif" alt="World News" />
      <Title text={"HACK A NEWS"} link={"/"} />
      <Navbar />
    </header>
  );
};
