import { useQuery } from "react-query";
import axios from "axios";

export const usegetLive = () => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useQuery(
    ["payment-configuration"],
    async () => {
      const response = await axios.post(
        `${baseURL}/payment-configuration`,
      );
      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
