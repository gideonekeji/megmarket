import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useRemoveStoreimages = () => {
  const queryClient = useQueryClient();
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation(
    async ({
      store_id,
      store_image_id,
    }: {
      store_id: string;
      store_image_id: string;
    }) => {
      const token = Cookies.get("nlyticalwebtoken"); // Get token from cookies

      const response = await axios.post(
        `${baseURL}/remove-storeimages`,
        { store_id, store_image_id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("storeImages"); // Refresh the list after deletion
      },
    }
  );
};
