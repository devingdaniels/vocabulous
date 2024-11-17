"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";

const ChatPage = () => {
  const { isAuthenticated, getStoredUser, isInitialized } = useAuth();
  const router = useRouter();

  const user = getStoredUser();

  useEffect(() => {
    if (isInitialized && !isAuthenticated()) {
      console.log("User is not authenticated, redirecting to login page...");
      router.replace("/auth/login");
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized) {
    console.log("Auth context is not initialized yet...");
  }

  if (!isAuthenticated() || !user) {
    return null;
  }

  return (
    <div>
      <NavBar user={user} />
    </div>
  );
};

export default ChatPage;
