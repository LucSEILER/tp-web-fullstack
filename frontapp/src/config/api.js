import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => response, // Laisse passer la réponse si tout va bien
//   (error) => {
//     // Si erreur 401, on redirige vers /login
//     if (error.response && error.response.status === 401) {
//       window.location.href = "/login";
//     }

//     // Tu peux aussi afficher une notification ici
//     return Promise.reject(error);
//   }
// );

export default api;
