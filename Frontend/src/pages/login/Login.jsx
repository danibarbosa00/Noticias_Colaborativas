import { useForm } from "react-hook-form";
import { loginUserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  EMAIL_REGEX,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "../../utils/constants";
import "./login.css";
import { Context } from "../../context/authContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { setUser } = useContext(Context);

  const handleLogin = async (data) => {
    try {
      const response = await loginUserService(data);

      const token = response.data.token;

      const nombre = response.data.usuario.nombre;
      const id = response.data.usuario.id;
      const fotoUsuario = response.data.usuario.foto;
      const biografia = response.data.usuario.biografia;
      const nickName = response.data.usuario.nickName;

      localStorage.setItem("fotoUsuario", JSON.stringify(fotoUsuario));
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("nombre", JSON.stringify(nombre));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("biografia", JSON.stringify(biografia));
      localStorage.setItem("nickName", JSON.stringify(nickName));
      setUser({
        nombre,
        id,
        token,
        email: data.email,
        biografia,
        fotoUsuario,
        nickName,
      });
      navigate("/noticias/login");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setLoginError("Las credenciales no coinciden");
    }
  };

  return (
    <div className="content-login">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-group">
          <label className="labelLogin" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="inputLogin"
            type="email"
            id="email"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
          />
          {errors.email && <p>Escribe el email completo</p>}
        </div>
        <div className="form-group">
          <label className="labelLogin" htmlFor="password">
            Contraseña
          </label>
          <input
            className="inputLogin"
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: MIN_LENGTH_PASSWORD,
              maxLength: MAX_LENGTH_PASSWORD,
            })}
          />
          {errors.password && <p>Contraseña inválida</p>}
        </div>
        <button className="logueate" type="submit">
          Iniciar sesión
        </button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
