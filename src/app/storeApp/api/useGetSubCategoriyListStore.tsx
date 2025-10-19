import { useQuery } from "react-query";
import axios from "axios";
import { StoreSubCategoriyList } from "@/app/types/Restypes";
import Cookies from "js-cookie";

export const useGetSubCategoriyListStore = () => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const service_id = Cookies.get("service_id");

  return useQuery<StoreSubCategoriyList>(
    ["fetch-servicesubcategories", service_id], // Include service_id in query key
    async () => {
      const response = await axios.post<StoreSubCategoriyList>(
        `${baseURL}/fetch-servicesubcategories`,
        { service_id } // Pass service_id in request body
      );
      return response.data;
    },
    {
      enabled: !!service_id, // Ensure the query only runs if service_id exists
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
