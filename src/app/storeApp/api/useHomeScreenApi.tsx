import { useQuery } from "react-query";
import axios from "axios";
import { HomeScreenRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

export const useHomeScreenApi = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  return useQuery<HomeScreenRes>(
    ["web-home", user_id], // include user_id in query key
    async () => {
      const response = await axios.post<HomeScreenRes>(
        `${baseURL}/web-home`,
        user_id ? { user_id } : {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      enabled: true, // Always fetch; can be made conditional if needed
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
