// This is the home page that will the user will be redirected to after login (set in next.config.js)
"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { VocabDashboard } from "@/layout/VocabDashboard";
import { getUserInfo } from "@/api/auth";
import { decks } from "@/fakeData/data";

const App: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, getStoredUser, isInitialized } = useAuth();
  const user = getStoredUser();

  useEffect(() => {
    if (isInitialized && !isAuthenticated()) {
      console.log("User is not authenticated, redirecting to login page...");
      // router.replace("/auth/login");
      // return;
    }

    const userInfo = getUserInfo();
    console.log("userInfo", userInfo);
  }, [isInitialized, isAuthenticated, router]);

  if (!isAuthenticated() || !user) {
    console.log("User is not authenticated... :(");
    // return null;
  }

  return (
    <>
      <VocabDashboard user={user || null} decks={decks} />
    </>
  );
};

export default App;
