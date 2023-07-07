import { useEffect, useState } from "react";
import { getAllNoticiasStandard } from "../services/NoticiasService";

const useNoticias = () => {
  const [currentPage1, setCurrentPage1] = useState(0);
  const [noticias, setNoticias] = useState({
    type: {
      type: "",
      subItem: "",
    },
    noticias: [],
  });
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState("");

  const getUrl = (type, subItem) => {
    const noticias = {
      ultimas: "/noticias",
      valoradas: "/noticias/valoradas",
      nickName: "/noticias/usuarios/nickName/" + subItem,
      nombre: "/noticias/usuarios/nombre/" + subItem,
      tema: "/noticias?tema=" + subItem,
      titulo: "/noticias?titulo=" + subItem,
    };
    return noticias[type];
  };
  const loadNoticias = async (type, subItem) => {
    try {
      setCurrentPage1(0);
      setLoading(true);
      const data = await getAllNoticiasStandard(getUrl(type, subItem));
      setNoticias({ type: { type, subItem }, noticias: data.data.data });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNoticias("ultimas");
  }, []);

  return {
    noticias,
    loading,
    error,
    loadNoticias,
    currentPage1,
    setCurrentPage1,
  };
};

export default useNoticias;
