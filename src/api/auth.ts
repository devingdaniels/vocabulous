import axios from "axios";

export const getUserInfo = async () => {
  const url = "https://api.vocabulous.xyz/api/user";
  axios.defaults.withCredentials = true;
  const response = await axios.get(url);
  return response.data;
};
