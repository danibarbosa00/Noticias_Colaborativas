import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";
import Noticias from "./pages/HomePage/Noticias";
import Register from "./pages/register/Register";
import NoticiasLogueado from "./pages/HomePageLogin/NoticiasLogueado";
import CrearNoticia from "./pages/crearNoticia/CrearNoticia";
import ModificarNoticia from "./pages/modificarNoticia/ModificarNoticia";
import MisNoticia from "./pages/misNoticias/MisNoticias";
import MisComentarios from "./pages/misComentarios/MisComentarios";
import ModificarUsuario from "./pages/modificarUsuario/ModificarUsuario";
import { AuthProvider } from "./context/authContext";
import { PerfilUsuarioNickName } from "../src/pages/perfilUsuario/PerfilUsuario";
import { PerfilUsuarioNombre } from "../src/pages/perfilUsuario/PerfilUsuario";

import "./App.css";
import "./pages/HomePage/noticias.css";
import "./pages/HomePageLogin/noticiasLogueado.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Noticias />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<Register />} />
          <Route path="/noticias/login" element={<NoticiasLogueado />} />
          <Route
            path="/noticias/login/crearNoticia"
            element={<CrearNoticia />}
          />
          <Route
            path="/usuarios/usuario/nombre/:nombre"
            element={<PerfilUsuarioNombre />}
          />
          <Route
            path="/usuarios/usuario/nickName/:nickName"
            element={<PerfilUsuarioNickName />}
          />
          <Route
            path="/noticias/login/modificarNoticia/:id"
            element={<ModificarNoticia />}
          />
          <Route path="/noticias/login/misNoticias" element={<MisNoticia />} />
          <Route
            path="/noticias/login/misComentarios"
            element={<MisComentarios />}
          />
          <Route
            path="/noticias/login/modificarUsuario"
            element={<ModificarUsuario />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
