import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

// Fetch the review data
export const useUserEditReview = () => {
  const user_id = Cookies.get("user_id");
  const review_id = Cookies.get("reviewid");
  const token = Cookies.get("nlyticalwebtoken");

  if (!user_id || !review_id) {
    throw new Error("User ID and Review ID are required for fetching reviews");
  }

  return useQuery(
    ["edit-userreview", user_id, review_id],
    async () => {
      const response = await axios.post(
        `${baseURL}/edit-userreview`,
        { user_id, id: review_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );
};

// Update the review
export const useUpdateReview = () => {
  const token = Cookies.get("nlyticalwebtoken");

  return useMutation(
    async ({ user_id, id, service_id, review_star, review_message }) => {
      const response = await axios.post(
        `${baseURL}/edit-userreview`,
        { id, user_id, service_id, review_star, review_message },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    }
  );
};
