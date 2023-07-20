import axios from "axios";

const axiosInstance = axios.create({
    baseURL:`http://localhost:5001/api/`
})

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default axiosInstance