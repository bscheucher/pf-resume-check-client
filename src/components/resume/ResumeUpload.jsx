import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ResumeUpload = ({ fetchResumes }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:5000/resumes/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
    fetchResumes();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">Upload Your Resume</h2>

        <div className="mb-3">
          <label className="form-label">Select a PDF file:</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default ResumeUpload;
