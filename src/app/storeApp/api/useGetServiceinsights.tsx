import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { GrapphData } from "@/app/types/Restypes";

export const useGetServiceinsights = (service_id: string, monthname: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const token = Cookies.get("nlyticalwebtoken");

  return useQuery<GrapphData>(
    ["get-serviceinsights", service_id, monthname],
    async () => {
      const response = await axios.post<GrapphData>(
        `${baseURL}/get-serviceinsights`,
        { service_id, monthname },
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
