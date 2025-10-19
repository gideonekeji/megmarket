import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useServiceLike = () => {
  // Get values from cookies
  const user_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const token = Cookies.get("nlyticalwebtoken"); // <-- Get token from cookies

  if (!user_id || !service_id || !token) {
    throw new Error("Required data (user_id, service_id, or token) is missing");
  }

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    "service-like",
    async () => {
      const response = await axios.post(
        `${baseURL}/service-like`,
        { user_id, service_id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Pass token here
          },
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
