import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",

  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    // console.log("Token in api.js:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
