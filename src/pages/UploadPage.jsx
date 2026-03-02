import { useState, useRef } from "react";
import axios from "axios";
import "./UploadPage.css";

const BASE_URL = "https://upload-server-crv8.onrender.com";

function UploadPage() {
const [file, setFile] = useState(null);
const [message, setMessage] = useState("");
const fileInputRef = useRef();

const handleFileChange = (f) => {
if (!f) return;
setFile(f);
setMessage("");
};

const handleDrop = (e) => {
e.preventDefault();
const droppedFile = e.dataTransfer.files[0];
handleFileChange(droppedFile);
};

const handleUpload = async () => {
if (!file) {
alert("Please select an Excel file");
return;
}


try {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${BASE_URL}/upload-donors`, formData);
  setMessage(res.data.message || "Upload successful");
  setFile(null);
} catch (err) {
  console.error(err);
  setMessage("Upload failed");
}


};

return ( <div className="upload-wrapper">
<div
className="upload-box"
onDragOver={(e) => e.preventDefault()}
onDrop={handleDrop}
onClick={() => fileInputRef.current.click()}
> <h2>Upload your files</h2>


    <div className="upload-icon">⬆️</div>

    <p>
      Drop <b>Excel files</b> here
    </p>

    <div className="or">OR</div>

    <button
      className="upload-btn"
      onClick={(e) => {
        e.stopPropagation();
        handleUpload();
      }}
    >
      Upload
    </button>

    {file && <p className="file-name">📄 {file.name}</p>}

    <input
      ref={fileInputRef}
      type="file"
      accept=".xlsx,.xls"
      hidden
      onChange={(e) => handleFileChange(e.target.files[0])}
    />

    {message && <p className="message">{message}</p>}
  </div>
</div>


);
}

export default UploadPage;
