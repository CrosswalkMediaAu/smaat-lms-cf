// auth-provider.tsx
"use client";

import { MockAuthProvider } from "./mock-auth-provider";
import { ClerkAuthProvider } from "./clerk-auth-provider";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

export function useAuth({ children }: { children: React.ReactNode }) {
  return useMock ? (
    <MockAuthProvider>{children}</MockAuthProvider>
  ) : (
    <ClerkAuthProvider>{children}</ClerkAuthProvider>
  );
}
