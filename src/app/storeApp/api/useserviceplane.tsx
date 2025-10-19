import { useQuery } from "react-query";
import axios from "axios";
import { Subscriptionplan } from "@/app/types/Restypes";

export const useServicePlane = () => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useQuery<Subscriptionplan>(
    ["subscription-plan"],
    async () => {
      const response = await axios.post<Subscriptionplan>(
        `${baseURL}/subscription-plan`
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
