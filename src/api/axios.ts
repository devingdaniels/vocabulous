// This is the axios instance that will be used to make requests to the backend
import axios from "axios";
// import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

// // Add request interceptor to handle XSRF token
// Axios.interceptors.request.use((config) => {
//   const xsrfToken = Cookies.get("XSRF-TOKEN");
//   if (xsrfToken) {
//     config.headers["X-XSRF-TOKEN"] = xsrfToken;
//   }
//   return config;
// });
