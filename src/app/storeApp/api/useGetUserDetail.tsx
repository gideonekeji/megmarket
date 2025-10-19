import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateUserDetailForDemoClient } from "@/app/types/Restypes";

export const useGetUserDetail = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  return useQuery<UpdateUserDetailForDemoClient>(
    ["update-userprofile", user_id], // include user_id in query key for better caching
    async () => {
      const response = await axios.post<UpdateUserDetailForDemoClient>(
        `${baseURL}/update-userprofile`,
        user_id ? { user_id } : {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      enabled: !!user_id, // Prevent fetching if user_id is missing
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
