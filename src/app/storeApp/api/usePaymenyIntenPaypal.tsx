"use client";
import { useQuery } from "react-query";
import axios from "axios";

export const usePaymenyIntenPaypal = () => {
  // Avoid accessing sessionStorage on server
  const price = typeof window !== "undefined" ? sessionStorage.getItem("planPrice") : null;

  // Extract only numeric value
  const amount = price ? price.replace(/[^\d.-]/g, "") : "";

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    ["paypal-intent", amount], // Include amount in cache key
    async () => {
      const response = await axios.post(`${baseURL}/paypal-intent`, { amount });
      return response.data;
    },
    {
      enabled: !!amount, // Prevent query if amount is not available
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
