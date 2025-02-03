import axios from "axios";
import { NEXT_PUBLIC_API_URL } from ".";

const api = axios.create({
  baseURL: `${NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
