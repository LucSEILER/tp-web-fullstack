import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
