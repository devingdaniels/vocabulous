export const getBackendURL = (postFix: string): string => {
  const baseURL =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_DEV;

  if (!baseURL) {
    throw new Error("Base URL is not defined. Check your environment variables.");
  }

  return `${baseURL.replace(/\/$/, "")}/${postFix.replace(/^\//, "")}`;
};
