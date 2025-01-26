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

export const getBackendURL = (postFix: string): string => {
  const baseURL =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_DEV;

  if (!baseURL) {
    throw new Error("Base URL is not defined. Check your environment variables.");
  }

  // Remove trailing slash from baseURL
  return `${baseURL.replace(/\/$/, "")}/${postFix.replace(/^\//, "")}`;
};
