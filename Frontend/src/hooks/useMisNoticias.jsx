import { useEffect, useState } from "react";
import { getMisNoticias } from "../services/NoticiasService";

const useMisNoticias = (user) => {
  const [misNoticias, setMisNoticias] = useState([]);
  const [loadingMisNoticias, setLoadingMisNoticias] = useState([false]);
  const [errorMisNoticias, setErrorMisNoticias] = useState("");
  useEffect(() => {
    const loadMisNoticias = async () => {
      try {
        setLoadingMisNoticias(true);
        const data = await getMisNoticias(user);
        setMisNoticias(data.data.data);
      } catch (error) {
        setErrorMisNoticias(error.message);
      } finally {
        setLoadingMisNoticias(false);
      }
    };
    loadMisNoticias();
  }, [user]);

  return { misNoticias, loadingMisNoticias, errorMisNoticias };
};

export default useMisNoticias;
