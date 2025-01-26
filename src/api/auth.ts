import axios from "axios";

const getCsrfToken = async () => {
  const response = await axios.get("https://api.vocabulous.xyz/sanctum/csrf-cookie");
  return response.data.csrfToken;
};

export const getUserInfo = async () => {
  const url = "https://api.vocabulous.xyz/api/user";
  const res = await getCsrfToken();
  console.log("res", res);
  axios.defaults.withCredentials = true;
  const response = await axios.get(url);
  return response.data;
};
