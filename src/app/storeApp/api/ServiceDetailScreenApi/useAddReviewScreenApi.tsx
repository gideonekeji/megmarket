import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { AddReviewDetailsRes } from "../../../types/Restypes";

// Update the API hook to use `useMutation`
export const useAddReviewScreenApi = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation<
    AddReviewDetailsRes,
    Error,
    { service_id: string; user_id: string; review_star: string; review_message: string }
  >(async ({ service_id, user_id, review_star, review_message }) => {
    const token = Cookies.get("nlyticalwebtoken");

    const response = await axios.post<AddReviewDetailsRes>(
      `${baseURL}/add-review`,
      { service_id, user_id, review_star, review_message },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data;
  });
};
