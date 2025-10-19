import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useTotalPercentage = (vendor_id: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    ["total-percentage", vendor_id],
    async () => {
      const token = Cookies.get("nlyticalwebtoken"); // Retrieve token from cookies

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.post(
        `${baseURL}/total-percentage`,
        { vendor_id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Bearer
          },
        }
      );

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!vendor_id, // Only run if vendor_id exists
    }
  );
};
