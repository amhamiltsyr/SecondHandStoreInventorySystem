import React from "react";
import "./Upload.css";
import UploadForm from "./UploadForm";

const Upload: React.FC = () => {
  return (
    <div className="upload-container">
      <div className="form">
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload;
