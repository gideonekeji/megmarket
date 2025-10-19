import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useServiceLead = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation(async (service_id: string) => {
    const token = Cookies.get("nlyticalwebtoken");

    const response = await axios.post(
      `${baseURL}/service-count`,
      { service_id },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data;
  });
};
