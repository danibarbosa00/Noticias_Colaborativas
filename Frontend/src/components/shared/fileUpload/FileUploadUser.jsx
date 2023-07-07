import { useContext } from "react";
import { Context } from "../../../context/authContext";

const defaultImageURL = "/fotobase.jpg";

export const FileUploadUser = ({ setSelectedFile, selectedFile }) => {
  const { user } = useContext(Context);
  const { fotoUsuario } = user;
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const { result } = event.target;
      document.getElementById("preview-image").src = result;
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const handleDeleteFile = () => {
    setSelectedFile(null);
    document.getElementById("preview-image").src = defaultImageURL;
  };

  return (
    <div className="file-upload-component">
      <img
        id="preview-image"
        alt="Imagen usuario"
        src={
          `/${fotoUsuario}` !== defaultImageURL
            ? `${import.meta.env.VITE_BACKEND_URL}/usuarios/${fotoUsuario}`
            : defaultImageURL
        }
      />
      <label htmlFor="foto"></label>
      <input type="file" id="foto" onChange={handleFileChange} />
      {selectedFile && (
        <>
          <button type="button" onClick={handleDeleteFile}>
            Borrar foto
          </button>
        </>
      )}
    </div>
  );
};
