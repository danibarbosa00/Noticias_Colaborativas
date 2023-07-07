import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="row links">
          <a
            href="https://www.facebook.com"
            title="facebook icon"
            id="facebook"
          ></a>
          <a
            href="https://www.instagram.com/"
            title="instagram icon"
            id="instagram"
          ></a>
          <a
            href="https://www.youtube.com/"
            title="youtube icon"
            id="youtube"
          ></a>
          <a href="https://twitter.com/" title="twitter icon" id="twitter"></a>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="/archivosFooter/Página de contacto.pdf">Contacto</a>
            </li>
            <li>
              <a href="/archivosFooter/Nuestros servicios.pdf">
                Nuestros Servicios
              </a>
            </li>
            <li>
              <a href="/archivosFooter/Política de Privacidad.pdf">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="/archivosFooter/Términos y condiciones.pdf">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/archivosFooter/Trabaja con nosotros.pdf">
                Trabaja con nosotros
              </a>
            </li>
          </ul>
        </div>

        <div className="row">
          HACKABOSS© 2023 Hack a News || Creado por David, Dani y Alex
        </div>
      </footer>
    </>
  );
};
export default Footer;
