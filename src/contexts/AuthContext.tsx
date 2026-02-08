import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API } from "@/lib/api";

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  signup: (username: string, displayName: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("userid");
    if (stored) setUserId(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data.message || "Invalid credentials" };
      }
      const data = await res.json();
      localStorage.setItem("userid", data.token);
      setUserId(data.token);
      return {};
    } catch {
      return { error: "Network error. Please try again." };
    }
  }, []);

  const signup = useCallback(async (username: string, displayName: string, email: string, password: string) => {
    try {
      const res = await fetch(API.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, display_name: displayName, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data.message || "Signup failed" };
      }
      const data = await res.json();
      // Auto-login after signup
      const loginResult = await login(username, password);
      return loginResult;
    } catch {
      return { error: "Network error. Please try again." };
    }
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem("userid");
    localStorage.removeItem("profileUrl");
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated: !!userId, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
