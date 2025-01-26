// This is the axios instance that will be used to make requests to the backend
import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
