"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  selectIsAuthInitialized,
  selectIsLoggedIn,
} from "@/lib/user/selectors";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthInitialized = useSelector(selectIsAuthInitialized);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthInitialized) return;
    if (!isLoggedIn) {
      router.replace("/signin");
    }
  }, [isLoggedIn, isAuthInitialized, router]);

  if (!isAuthInitialized) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) return null;

  return <>{children}</>;
} 
