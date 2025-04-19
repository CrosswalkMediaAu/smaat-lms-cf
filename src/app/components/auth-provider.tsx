"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the session/token with your backend
        const storedUser = localStorage.getItem("lms-user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to your auth endpoint
      // This is a mock implementation
      const mockUser = {
        id: "user-1",
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? ("admin" as const) : ("user" as const),
      };

      setUser(mockUser);
      localStorage.setItem("lms-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to your registration endpoint
      // This is a mock implementation
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
        role: "user" as const,
      };

      setUser(mockUser);
      localStorage.setItem("lms-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
