import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import ResumeUpload from "../components/resume/ResumeUpload";
import { getResumesByUserId } from "../routes/resumeRoutes";
import LoadingIndicator from "../components/loading/LoadingIndicator";
import ResumeList from "../components/resume/ResumeList";
import ResumeAnalysis from "../components/resume/ResumeAnalysis";

const Home = () => {
  
  const { userId } = useContext(AuthContext);
  console.log("User ID in Home", userId);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState({});

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getResumesByUserId(userId);
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchResumes();
  }, [userId, fetchResumes]);

  const handleSelect = (resume) => {
    setSelectedResume(resume);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Upload Section */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h2 className="text-center mb-3">Upload Resume</h2>
            <ResumeUpload fetchResumes={fetchResumes} />
          </div>

          {/* Resumes List Section */}
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-3">Your Resumes</h2>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <ResumeList resumes={resumes} onSelect={handleSelect} setResumes={setResumes}/>
            )}
          </div>
        </div>

        {/* Resume Analysis Section */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-3">Resume Analysis</h2>
            {selectedResume.id ? (
              <ResumeAnalysis resume={selectedResume} />
            ) : (
              <p className="text-muted text-center">
                Select a resume to analyze
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
