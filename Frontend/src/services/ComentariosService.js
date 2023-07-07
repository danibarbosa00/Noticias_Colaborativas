import axios from "axios";
import { config } from "./NoticiasService";

export async function getMisComentarios(user, id) {
  const misComentarios = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/login/miscomentarios/${id}`,
    config(user)
  );
  return misComentarios;
}

export async function deleteMisComentarios(id, user) {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/comentarios/${id}`,
    config(user)
  );
  return response.data;
}

export async function crearComentarios(id, user, formData) {
  const nuevoComentario = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id}/comentarios`,
    formData,
    config(user)
  );
  return nuevoComentario;
}
