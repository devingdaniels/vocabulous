import { AuthorizedUser } from "@/interfaces/user.interface";

export const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!storedUser || !token) {
    throw new Error("No user found in localStorage");
  }

  return {
    user: JSON.parse(storedUser) as AuthorizedUser,
    token: token,
  };
};
