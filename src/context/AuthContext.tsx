import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"; // ✅ type-only import

const api_domain = import.meta.env.VITE_PORTAL_URL as string;

export interface User {
  config: any;
  is_authenticated: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${api_domain}/main_website/api/switches/`, {
      credentials: "include",
    })
      .then((res) => {
        // console.log("Response status:", res.status);
        return res.ok ? res.json() as Promise<User> : Promise.reject();
      })
      .then((data) => {
        // console.log("Fetched user:", data);
        setUser(data);
      })
      .catch(() => {
        // console.error("Auth fetch failed", err);
        setUser(null);
      });
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
