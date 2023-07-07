import { useEffect, useState } from "react";

import { getMisComentarios } from "../services/ComentariosService";

const useMisComentarios = (user, id) => {
  const [misComentarios, setMisComentarios] = useState([]);
  const [loadingMisComentarios, setLoadingMisComentarios] = useState([false]);
  const [errorMisComentarios, setErrorMisComentarios] = useState("");

  useEffect(() => {
    const loadMisComentarios = async () => {
      try {
        setLoadingMisComentarios(true);
        const data = await getMisComentarios(user, id);
        setMisComentarios(data.data.data);
      } catch (error) {
        setErrorMisComentarios(error.message);
      } finally {
        setLoadingMisComentarios(false);
      }
    };
    loadMisComentarios();
  }, [user, id]);

  return { misComentarios, loadingMisComentarios, errorMisComentarios };
};

export default useMisComentarios;
