import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE==="developmet"? "http://localhost:8080/api":"/api",
  withCredentials: true,
});
