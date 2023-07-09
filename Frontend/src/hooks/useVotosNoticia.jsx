import { useEffect, useState } from "react";
import { getVotosNoticiaService } from "../services/NoticiasService";

const useVotosNoticia = (id_noticia) => {
  const [votosInicial, setVotosInicial] = useState([]);
  const [loadingVotos, setLoadingVotos] = useState([false]);
  const [errorVotos, setErrorVotos] = useState("");
  useEffect(() => {
    const loadVotos = async () => {
      try {
        setLoadingVotos(true);
        const votos = await getVotosNoticiaService(id_noticia);
        setVotosInicial(votos.data);
      } catch (error) {
        setErrorVotos(error.message);
      } finally {
        setLoadingVotos(false);
      }
    };
    loadVotos();
  }, [id_noticia]);

  return { votosInicial, loadingVotos, errorVotos };
};

export default useVotosNoticia;
