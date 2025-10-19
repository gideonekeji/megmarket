import { useQuery } from "react-query";
import axios from "axios";

export const useGetPrice = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useQuery(
    ["show-pricerange"], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.get(`${baseURL}/show-pricerange`);

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
