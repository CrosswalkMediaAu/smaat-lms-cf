"use client";

import type React from "react";
import { createContext, useContext } from "react";
// import { useUser, useClerk, useSession } from "@clerk/nextjs";     original with the useSession
import { useUser, useClerk } from "@clerk/nextjs";

type AuthContextType = {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string; // Clerk doesn't use roles out of the box — you'd store this in metadata
  } | null;
  login: (redirectUrl?: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut, openSignIn } = useClerk();

  const login = (redirectUrl?: string) => {
    openSignIn({ redirectUrl });
  };

  const logout = () => {
    signOut();
  };

  const transformedUser = user
    ? {
        id: user.id,
        name: user.fullName || user.username || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        role: user.publicMetadata.role as string | undefined,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user: transformedUser,
        login,
        logout,
        isLoading: !isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
