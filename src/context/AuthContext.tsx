"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthorizedUser } from "@/interfaces/user.interface";

interface AuthContextType {
  isAuthenticated: () => boolean;
  getStoredUser: () => AuthorizedUser | null;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    console.log("Initializing auth state...");

    // First check localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }

    // Then check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const urlUser = urlParams.get("user");

    if (urlToken) {
      console.log("Found token in URL, storing...");
      localStorage.setItem("token", urlToken);
      setAuthToken(urlToken);
    }

    if (urlUser) {
      try {
        const user = JSON.parse(decodeURIComponent(urlUser)) as AuthorizedUser;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Clean URL if parameters exist
    if (urlToken || urlUser) {
      const cleanPath = window.location.pathname;
      window.history.replaceState({}, "", cleanPath);
    }

    setIsInitialized(true);
  }, []);

  const isAuthenticated = () => {
    return !!authToken;
  };

  const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser) as AuthorizedUser;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    router.push("/auth/login");
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getStoredUser, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
