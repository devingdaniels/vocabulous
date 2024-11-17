"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Get Google OAuth2 URL
    const redirectURL =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_PROD
        : process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_DEV;

    if (!redirectURL) throw new Error("Google URL not found");

    // Redirect to Google OAuth2 URL
    router.push(redirectURL);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome to Vocabulous
        </h1>
        <Button
          className="w-full px-4 py-2 text-white font-medium bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleLogin}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
