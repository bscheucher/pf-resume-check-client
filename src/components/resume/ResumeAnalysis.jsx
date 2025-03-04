import React, { useState } from "react";
import { analyzeResume } from "../../routes/resumeRoutes";

const ResumeAnalysis = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis(null);

    try {
      const response = await analyzeResume({
        resumeContent: resume.content,
        jobDescription,
        resumeId: resume.id,
      });

      setAnalysis(response.data);
    } catch (err) {
      console.error("Error analyzing resume:", err);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">Open AI's Feedback</h2>

        <div className="mb-3">
          <label className="form-label">Job Description:</label>
          <textarea
            className="form-control"
            rows="4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description"
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleAnalyze}
          disabled={loading || !jobDescription.trim()}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {loading && <p className="text-center text-muted mt-3">Analyzing...</p>}

        {analysis && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h3 className="mb-2">Analysis Results</h3>
            <p className="text-muted">{analysis.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
