import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { GegetcampaignAll } from "@/app/types/Restypes";

export const useGetAllCompain = () => {
  const vendor_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    "get-campaign",
    async () => {
      const response = await axios.post<GegetcampaignAll>(
        `${baseURL}/get-campaign`,
        { vendor_id },
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
