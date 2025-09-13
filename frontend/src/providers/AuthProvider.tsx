"use client";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, setAuth } = useAuthStore();

  const onAuthSessionLogin = async () => {
    setAuth({ username });
  };

  useEffect(() => {
    if (username) {
      onAuthSessionLogin();
    }
  }, [username]);

  return <>{children}</>;
}
