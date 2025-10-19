import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetPaymenthistrySubription = () => {
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  if (!user_id) {
    throw new Error("User ID is required");
  }

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    ["get-susbcribepayment", user_id],
    async () => {
      const response = await axios.post(
        `${baseURL}/get-susbcribepayment`,
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
