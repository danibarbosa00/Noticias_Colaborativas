import axios from "axios";

export const config = (user) => {
  if (user.token) {
    return {
      headers: {
        Authorization: user.token,
      },
    };
  }
  return {};
};

export async function getAllNoticiasStandard(url) {
  const noticias = await axios.get(`${import.meta.env.VITE_BACKEND_URL}` + url);
  return noticias;
}

export function getNoticiaId(id) {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/noticias/` + id);
}

export async function getMisNoticias(user) {
  const misNoticias = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/login/misnoticias`,
    config(user)
  );
  return misNoticias;
}

export async function deleteMisNoticias(id, user) {
  const deleteMisNoticias = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id}`,
    config(user)
  );
  return deleteMisNoticias;
}

export async function postNoticia(formData, user) {
  const nuevaNoticia = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/noticias`,
    formData,
    config(user)
  );
  return nuevaNoticia;
}

export async function modificarNoticia(formData, id_noticia, user) {
  const noticia = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id_noticia}`,
    formData,
    config(user)
  );
  return noticia;
}

export async function votarPositivoService(id_noticia, user) {
  const votar = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id_noticia}/votar/positivo`,
    null,
    config(user)
  );
  return votar;
}

export async function votarNegativoService(id_noticia, user) {
  const votar = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id_noticia}/votar/negativo`,
    null,
    config(user)
  );
  return votar;
}

export async function getEstadoVotoNoticiaService(id_noticia, user) {
  const estadoVotos = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/votos/${id_noticia}`,
    config(user)
  );
  return estadoVotos;
}

export async function getVotosNoticiaService(id_noticia) {
  const votos = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/noticias/${id_noticia}/votos`
  );
  return votos;
}
