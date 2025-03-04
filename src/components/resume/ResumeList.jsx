import React from "react";
import "./ResumeList.css";
import { deleteResume } from "../../routes/resumeRoutes";

const ResumeList = ({ resumes, onSelect, setResumes }) => {
  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== id)
      );
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">Uploaded Resumes</h2>

        {resumes.length > 0 ? (
          <ul className="list-group">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="d-flex flex-wrap justify-content-between align-items-center w-100"
                  onClick={() => onSelect(resume)}
                >
                  <span className="resume-name flex-grow-1">
                    {resume.filename}
                  </span>
                  <span className="badge-custom select">Select</span>
                </div>
                <button
                  className="badge-custom delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resume.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted text-center">No resumes uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ResumeList;
