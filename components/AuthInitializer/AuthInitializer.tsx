"use client";
import type { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { getUserData, refreshAccessToken } from "@/lib/user/operation";
import { useEffect } from "react";

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. пробуємо отримати юзера напряму
        await dispatch(getUserData()).unwrap();
      } catch (error) {
        try {
          // 2. якщо 401 → пробуємо refresh
          const refreshResult = await dispatch(refreshAccessToken()).unwrap();

          if (refreshResult) {
            await dispatch(getUserData()).unwrap();
          }
        } catch (refreshError) {
          // 3. якщо і refresh не працює → logout state
          console.log("Auth failed");
        }
      }
    }
    initAuth();
  }, [dispatch]);
  return null;
};

export default AuthInitializer;
