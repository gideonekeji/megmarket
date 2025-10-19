"use client";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const usePaymentIntent = () => {
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken"); // Get token from cookies
  const price =
    typeof window !== "undefined" ? sessionStorage.getItem("planPrice") : null;

  // Extract numeric value safely
  const total = price ? price.replace(/[^\d.-]/g, "") : "";

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    ["stripe-intent", user_id, total], // add dynamic params to cache key
    async () => {
      const response = await axios.post(
        `${baseURL}/stripe-intent`,
        { user_id, total },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );
      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
