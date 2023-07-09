import { useEffect, useState } from "react";
import { getPerfilUsuarioNickName } from "../services/UserService";
export const useDatosUsuarioNickname = (nickName) => {
  const [datosUsuarioNickName, setDatosUsuarioNickName] = useState([]);
  const [loadingUsuarioNickName, setLoadingUsuarioNickName] = useState(false);
  const [errorDatosUsuarioNickName, setErrorDatosUsuarioNickName] =
    useState("");
  useEffect(() => {
    const loadDatosUsuarioNickName = async () => {
      try {
        setLoadingUsuarioNickName(true);
        const datosNickName = await getPerfilUsuarioNickName(nickName);
        setDatosUsuarioNickName(datosNickName.data.data);
      } catch (error) {
        setErrorDatosUsuarioNickName(error.message);
      } finally {
        setLoadingUsuarioNickName(false);
      }
    };
    loadDatosUsuarioNickName();
  }, [nickName]);
  return {
    datosUsuarioNickName,
    loadingUsuarioNickName,
    errorDatosUsuarioNickName,
  };
};
