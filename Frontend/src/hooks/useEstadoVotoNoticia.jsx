import { useEffect, useState } from "react";
import { getEstadoVotoNoticiaService } from "../services/NoticiasService";

const useEstadoVotoNoticia = (id_noticia, user) => {
  const [estadoVotoInicial, setEstadoVotoInicial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadEstadoVoto = async () => {
      try {
        setLoading(true);
        const data = await getEstadoVotoNoticiaService(id_noticia, user);
        setEstadoVotoInicial(data.data.message);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEstadoVoto();
  }, [id_noticia, user]);

  return { estadoVotoInicial, loading, error };
};

export default useEstadoVotoNoticia;
