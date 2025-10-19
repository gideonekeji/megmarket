import { useQuery } from "react-query";
import axios from "axios";
import { StorelistRes } from "@/app/types/Restypes";

export const useStoreListApi = (service_id: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery<StorelistRes>(
    ["store-list", service_id], // Include service_id for unique caching per service
    async () => {
      const response = await axios.post<StorelistRes>(
        `${baseURL}/store-list`,
        { service_id } // Pass service_id in request body
      );
      return response.data;
    },
    {
      refetchInterval: 1000, // Refetch every 1 second
      refetchIntervalInBackground: true, // Continue refetching even when window is not focused
      refetchOnWindowFocus: false, // Avoid unnecessary fetch on window focus
      staleTime: 0, // Data becomes stale immediately
      cacheTime: 0, // Do not persist cache
    }
  );
};
