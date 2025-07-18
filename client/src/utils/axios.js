import axios from "axios";

const customFetch = axios.create({
  // TODO:Port might need changing in case of any error
  baseURL: "/api", // proxy to backend 
});

// optional: add auth token from localStorage (if you're using it)
// customFetch.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default customFetch;
