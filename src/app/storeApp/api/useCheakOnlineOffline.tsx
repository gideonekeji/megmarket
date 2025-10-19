"use client"; // Ensure client-side execution

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

// Mutation hook to update user status with token
const useCheckOnlineOffline = () => {
  return useMutation(
    async ({ user_id, status }: { user_id: string; status: string }) => {
      const token = Cookies.get("nlyticalwebtoken");
      await axios.post(
        `${baseURL}/user-online`,
        { user_id, status },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    }
  );
};

// Create Context
const OnlineStatusContext = createContext<{ isOnline: boolean }>({
  isOnline: false,
});

// Global Provider Component
export const OnlineStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const { mutate } = useCheckOnlineOffline();
  const userId = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  useEffect(() => {
    if (!userId) return;

    // Mark user as online when component mounts
    mutate({ user_id: userId, status: "1" });
    setIsOnline(true);

    const handleBeforeUnload = () => {
      // Use Beacon API with token support
      const data = JSON.stringify({ user_id: userId, status: "0" });
      const blob = new Blob([data], { type: "application/json" });

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const headerBlob = new Blob([JSON.stringify(headers)], {
        type: "application/json",
      });

      // Combine headers and body in a FormData if backend expects headers separately
      // If backend doesn't accept headers in Beacon, rely on session/cookie auth

      navigator.sendBeacon(`${baseURL}/user-online`, blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [mutate, userId, token]);

  return (
    <OnlineStatusContext.Provider value={{ isOnline }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

// Hook to use the Context
export const useOnlineStatus = () => {
  return useContext(OnlineStatusContext);
};
