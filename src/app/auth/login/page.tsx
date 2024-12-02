"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    const redirectURL =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_PROD
        : process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_DEV;

    if (!redirectURL) throw new Error("Google URL not found");
    router.push(redirectURL);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to Vocabulous</h1>
        <Button className="form-button" onClick={handleLogin}>
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
