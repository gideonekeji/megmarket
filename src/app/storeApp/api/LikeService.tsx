import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { FavouritePropertiesRes } from "@/app/types/Restypes";

export const useFavouriteProperties = () => {
  // Get user_id and token from cookies
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  if (!user_id) {
    throw new Error("User ID is required for fetching favourite properties");
  }

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery<FavouritePropertiesRes, Error>(
    "user_get_like_property",
    async () => {
      const response = await axios.post<FavouritePropertiesRes>(
        `${baseURL}/get-likedservices`,
        { user_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
