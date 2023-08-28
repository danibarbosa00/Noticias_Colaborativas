import { useEffect, useState } from "react";
import { getNoticiaId } from "../services/NoticiasService";

const useNoticiaId = (id) => {
  const [NoticiaId, setNoticiaId] = useState([]);
  const [loadingNoticiaId, setLoadingNoticiaId] = useState([false]);
  const [errorNoticiaId, setErrorNoticiaId] = useState("");
  useEffect(() => {
    const loadNoticiaId = async () => {
      try {
        setLoadingNoticiaId(true);
        const data = await getNoticiaId(id);
        setNoticiaId(data.data.data);
      } catch (error) {
        setErrorNoticiaId(error.message);
      } finally {
        setLoadingNoticiaId(false);
      }
    };
    loadNoticiaId();
  }, [id]);

  return { NoticiaId, loadingNoticiaId, errorNoticiaId };
};

export default useNoticiaId;
