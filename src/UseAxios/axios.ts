// // import axios from "axios";

// // const axiosInstance = axios.create({
// //   baseURL: "https://freelancemarketplace-server.vercel.app", // ✅ no space
// //   withCredentials: true,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://freelancemarketplace-server.vercel.app", // your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token to every request if it exists
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://freelancemarketplace-server.vercel.app", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Ensure headers exists (TypeScript fix)
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
