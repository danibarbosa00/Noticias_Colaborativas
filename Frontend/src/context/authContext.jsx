import React, { useState } from "react";
export const Context = React.createContext();

const token = JSON.parse(localStorage.getItem("token"));
const email = JSON.parse(localStorage.getItem("email"));
const id = JSON.parse(localStorage.getItem("id"));
const nombre = JSON.parse(localStorage.getItem("nombre"));
const fotoUsuario = JSON.parse(localStorage.getItem("fotoUsuario"));
const biografia = JSON.parse(localStorage.getItem("biografia"));
const nickName = JSON.parse(localStorage.getItem("nickName"));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    token && email && id
      ? { token, email, id, nombre, fotoUsuario, biografia, nickName }
      : null
  );
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}
