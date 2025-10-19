import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetReview } from "./useGetReview";

export const useDeleteUserReview = () => {
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");
  const { refetch } = useGetReview();

  if (!user_id) {
    throw new Error("User ID is required to delete review");
  }

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  // Use useMutation for the delete request
  return useMutation(
    async (id: string) => {
      const response = await axios.post(
        `${baseURL}/delete-userreview`,
        { user_id, id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Review deleted successfully", data);
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting review", error);
      },
    }
  );
};
