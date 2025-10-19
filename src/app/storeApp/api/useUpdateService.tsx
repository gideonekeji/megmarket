"use client";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useUpdateService = () => {
  const router = useRouter();

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const token = Cookies.get("nlyticalwebtoken");

  const enabled = Boolean(vendor_id && service_id && token);

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery(
    "update-service",
    async () => {
      if (!enabled) {
        router.push("/bussines");
        return;
      }

      const response = await axios.post(
        `${baseURL}/update-service`,
        { vendor_id, service_id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token here
          },
        }
      );

      return response.data;
    },
    {
      enabled,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false, // prevent retry loop if redirected
    }
  );
};
