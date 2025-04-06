import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL:
  //     import.meta.mode === "development" ? "http://localhost:4000/api" : "/api",
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default axiosInstance;
