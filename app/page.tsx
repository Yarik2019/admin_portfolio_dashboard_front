"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthInitialized, selectIsLoggedIn } from "@/lib/user/selectors";
const Page = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthInitialized = useSelector(selectIsAuthInitialized);

  useEffect(() => {
    if (!isAuthInitialized) return;
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/signin");
    }
  }, [isLoggedIn, isAuthInitialized, router]);
  return null;
};

export default Page;
