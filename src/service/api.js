import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

axiosInstance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
