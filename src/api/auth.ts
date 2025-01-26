import { getUserFromLocalStorage } from "@/utils";
import axios from "axios";

export const getUserInfo = async () => {
  const { user, token } = getUserFromLocalStorage();
  const url = "https://api.vocabulous.xyz/api/user";
  axios.defaults.withCredentials = true;
  const response = await axios.get(url);
  return response.data;
};
