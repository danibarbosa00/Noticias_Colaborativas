import { useEffect, useState } from "react";
import { getPerfilUsuarioNombre } from "../services/UserService";
export const useDatosUsuarioNombre = (nombre) => {
  const [datosUsuarioNombre, setDatosUsuarioNombre] = useState([]);
  const [loadingUsuarioNombre, setLoadingUsuarioNombre] = useState(false);
  const [errorDatosUsuarioNombre, setErrorDatosUsuarioNombre] = useState("");
  useEffect(() => {
    const loadDatosUsuarioNombre = async () => {
      try {
        setLoadingUsuarioNombre(true);
        const datosNombre = await getPerfilUsuarioNombre(nombre);
        setDatosUsuarioNombre(datosNombre.data.data);
      } catch (error) {
        setErrorDatosUsuarioNombre(error.message);
      } finally {
        setLoadingUsuarioNombre(false);
      }
    };
    loadDatosUsuarioNombre();
  }, [nombre]);
  return { datosUsuarioNombre, loadingUsuarioNombre, errorDatosUsuarioNombre };
};
