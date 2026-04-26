import axios from "axios";

export const portfolioApi = axios.create({
  baseURL: "https://portfolio-back-oudh.onrender.com",
  withCredentials: true,
});

// portfolioApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export const setAuthHeader = (token: string | null) => {
//     if (token) {
//         portfolioApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete portfolioApi.defaults.headers.common['Authorization'];
//     }
// }
