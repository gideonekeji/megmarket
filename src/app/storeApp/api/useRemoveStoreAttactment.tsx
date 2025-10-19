import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Cookies from "js-cookie"; // If you're storing the token in cookies

export const useRemoveStoreAttactment = () => {
  const queryClient = useQueryClient();
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation(
    async ({
      store_id,
      store_attach_id,
    }: {
      store_id: string;
      store_attach_id: string;
    }) => {
      const token = Cookies.get("nlyticalwebtoken"); // or localStorage.getItem("token")
      const response = await axios.post(
        `${baseURL}/remove-storeattachments`,
        { store_id, store_attach_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("storeImages");
      },
    }
  );
};
