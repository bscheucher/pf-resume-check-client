import API from "../services/api";

export const uploadResume = (formData) => API.post("/resumes/upload", formData);
export const analyzeResume = (data) => API.post("/resumes/analyze", data);
export const getResumesByUserId = (userId) => API.get(`/resumes/${userId}`);
export const getResumeById = (id) => API.get(`/resumes/${id}`);
export const deleteResume = (id) => API.delete(`/resumes/delete/${id}`);
