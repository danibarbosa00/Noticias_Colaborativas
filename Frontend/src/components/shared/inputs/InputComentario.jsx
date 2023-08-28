import { useContext, useState } from "react";
import { Context } from "../../../context/authContext";
import { crearComentarios } from "../../../services/ComentariosService";

const InputComentario = ({
  onSubmit,
  onClickInput,
  onClickButton,
  noticiaId,
}) => {
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(Context);
  const id = noticiaId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comentario.trim() === "") {
      setError("Debes escribir algo en el comentario.");
      return;
    }
    const formData = new FormData();
    formData.append("comentario", comentario);
    await crearComentarios(id, user, formData);
    onSubmit(comentario);
    setComentario("");
  };

  const handleChange = (e) => {
    setComentario(e.target.value);
  };

  return user !== null ? (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Añade tu comentario..."
          value={comentario}
          onChange={handleChange}
          onClick={onClickInput}
        />

        <button type="submit" onClick={onClickButton}>
          Publicar
        </button>
        {error}
      </form>
    </>
  ) : (
    <p>Logueate para comentar</p>
  );
};

export default InputComentario;
