import { Axios } from "./axios";

const getCsrfToken = async () => {
  const response = await Axios.get("https://api.vocabulous.xyz/sanctum/csrf-cookie");
  console.log("response", response);
  return response.data.csrfToken;
};

export const getUserInfo = async () => {
  const url = "https://api.vocabulous.xyz/api/user";
  const res = await getCsrfToken();
  console.log("res", res);
  Axios.defaults.withCredentials = true;
  const response = await Axios.get(url);

  console.log("user", response);

  if (response.status !== 200) {
    throw new Error("Failed to fetch user info");
  }

  return response.data;
};
