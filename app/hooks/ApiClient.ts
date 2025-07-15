import axios from "axios";
const ApiClient = axios.create({
  baseURL: "http://localhost:5270/api",
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {      
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default ApiClient;
