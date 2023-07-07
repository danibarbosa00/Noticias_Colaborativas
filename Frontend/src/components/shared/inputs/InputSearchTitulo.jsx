import { useState } from "react";

import "./index.css";

const BuscadorTituloInput = ({ loadNoticias }) => {
  const [titulo, setTitulo] = useState("");
  const [busquedaRealizada, setBusquedaRealizada] = useState(true);

  const handleInputChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim() === "") {
      return;
    }
    try {
      await loadNoticias("titulo", titulo);
      setBusquedaRealizada(!busquedaRealizada);
      setTitulo("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="titulo"
          type="text"
          placeholder={"Escribe el título"}
          value={titulo}
          onChange={handleInputChange}
        />
        <button id="submit" type="submit">
          <p>🔍</p>
        </button>
      </form>
    </>
  );
};

export default BuscadorTituloInput;
