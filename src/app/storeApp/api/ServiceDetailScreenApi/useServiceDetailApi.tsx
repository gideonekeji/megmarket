import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { ServiceDetailScreenRes } from "../../../types/Restypes";

export const useServiceDetailApi = (service_id: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const user_id = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");

  return useQuery<ServiceDetailScreenRes>(
    ["service-detail", service_id, user_id],
    async () => {
      const requestBody = user_id ? { service_id, user_id } : { service_id };

      const response = await axios.post<ServiceDetailScreenRes>(
        `${baseURL}/get-servicedetail`,
        requestBody,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
