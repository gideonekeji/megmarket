import { useQuery } from "react-query";
import axios from "axios";

export const UseGetFaq = () => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useQuery(
    ["get-faq"], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.get(`${baseURL}/get-faq`);

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
