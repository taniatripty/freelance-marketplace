import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://freelancemarketplace-server.vercel.app", // ✅ no space
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
