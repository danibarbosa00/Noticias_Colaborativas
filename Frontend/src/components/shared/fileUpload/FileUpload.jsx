const FileUploadComponent = ({ setSelectedFile, selectedFile }) => {
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
    document.getElementById("preview-image").src = "";
  };

  return (
    <div className="file-upload-component">
      <img
        id="preview-image"
        src={selectedFile ? URL.createObjectURL(selectedFile) : null}
      />

      <label htmlFor="foto"></label>
      <input type="file" id="foto" onChange={handleFileChange} />
      {selectedFile && (
        <button type="button" onClick={handleDeleteFile}>
          Borrar foto
        </button>
      )}
    </div>
  );
};

export default FileUploadComponent;
