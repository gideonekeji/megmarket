import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetKey = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";
  const token = Cookies.get("nlyticalwebtoken");

  return useQuery(
    ["get-paymentconfig"],
    async () => {
      const response = await axios.get(`${baseURL}/get-paymentconfig`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
