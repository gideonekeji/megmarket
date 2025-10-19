import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

interface AddReviewInput {
  service_id: string;
  vendor_id: string;
  store_name: string;
  store_description: string;
  price: string;
  subcategory_id: string;
  store_images: File[];
  store_attachments: File[];
}

export const useAddStoreApi = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation<any, Error, AddReviewInput>(
    async ({
      service_id,
      vendor_id,
      store_name,
      store_description,
      subcategory_id,
      price,
      store_images,
      store_attachments,
    }: AddReviewInput) => {
      const token = Cookies.get("nlyticalwebtoken"); // Get token from cookies

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();

      // Append fields
      formData.append("service_id", service_id);
      formData.append("vendor_id", vendor_id);
      formData.append("store_name", store_name);
      formData.append("store_description", store_description);
      formData.append("price", price);
      formData.append("subcategory_id", subcategory_id);

      // Append files
      store_images.forEach((file) => {
        formData.append("store_images[]", file);
      });
      store_attachments.forEach((file) => {
        formData.append("store_attachments[]", file);
      });

      // API call
      const response = await axios.post(`${baseURL}/add-store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass token here
        },
      });

      return response.data;
    }
  );
};
