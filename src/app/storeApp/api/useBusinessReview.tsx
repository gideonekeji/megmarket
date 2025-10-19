import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { BusinessReviewRes } from "@/app/types/Restypes";

export const useBusinessReview = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const service_id = Cookies.get("service_id");
  const token = Cookies.get("nlyticalwebtoken");

  if (!service_id) {
    throw new Error("Service ID is missing");
  }

  return useQuery<BusinessReviewRes>(
    ["business-review", service_id],
    async () => {
      const response = await axios.post<BusinessReviewRes>(
        `${baseURL}/business-review`,
        { service_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
