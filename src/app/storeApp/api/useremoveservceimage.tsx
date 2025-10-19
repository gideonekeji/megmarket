import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { RemoveServiceImagesRes } from "@/app/types/Restypes";

interface RemoveImageParams {
  vendor_id: string;
  service_id: string;
  service_image_id: string;
}

const useRemoveServiceImage = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation<RemoveServiceImagesRes, Error, RemoveImageParams>(
    async ({ vendor_id, service_id, service_image_id }) => {
      // Retrieve token from cookies
      const token = Cookies.get("nlyticalwebtoken"); // Change key if different

      const response = await axios.post<RemoveServiceImagesRes>(
        `${baseURL}/remove-serviceimages`,
        { vendor_id, service_id, service_image_id },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Image removed successfully", data);
      },
      onError: (error) => {
        console.error("Error removing image:", error.message);
      },
    }
  );
};

export default useRemoveServiceImage;
