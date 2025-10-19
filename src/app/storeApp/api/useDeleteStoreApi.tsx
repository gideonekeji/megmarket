import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useDeleteStoreApi = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation(
    async (store_id: string) => {
      const token = Cookies.get("nlyticalwebtoken");
      const response = await axios.post(
        `${baseURL}/delete-store`,
        { store_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        console.log("Store deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting store:", error);
      },
    }
  );
};
