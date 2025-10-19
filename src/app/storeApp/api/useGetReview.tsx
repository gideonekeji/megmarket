import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetReview = () => {
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  if (!user_id) {
    throw new Error("User ID not found in cookie");
  }

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    ["userReviewList", user_id],
    async () => {
      const response = await axios.post(
        `${baseURL}/user-reviewlist`,
        { user_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      enabled: !!user_id,
      onSuccess: (data) => {
        console.log("Fetched Reviews:", data);
      },
      onError: (error) => {
        console.error("Error fetching reviews:", error);
      },
    }
  );
};
