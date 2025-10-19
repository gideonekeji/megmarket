import { useQuery } from "react-query";
import axios from "axios";
import { HomeGetCountrieslisCategorytRes } from "@/app/types/Restypes";

export const useGetCountryCategoryApi = (
  value: string,
  category_search: string,
  lat: string,
  lon: string
) => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useQuery<HomeGetCountrieslisCategorytRes>(
    ["get-countriescategories", value, category_search],
    async () => {
      const response = await axios.post<HomeGetCountrieslisCategorytRes>(
        `${baseURL}/get-countriescategories`,
        { value, category_search, lat, lon }
      );
      return response.data;
    },
    {
      enabled: !!value || !!category_search, // Only fetch if there's a search or selected category
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
