import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { VendorDetailRes } from "@/app/types/Restypes";

export const VendorInfo = (vendor_id: string | null) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const token = Cookies.get("nlyticalwebtoken");

  return useQuery<VendorDetailRes>(
    ["vendor-info", vendor_id],
    async () => {
      const response = await axios.post<VendorDetailRes>(
        `${baseURL}/vendor-info`,
        { vendor_id },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      enabled: !!vendor_id, // only fetch if vendor_id exists
      refetchOnWindowFocus: false, // don’t auto refetch when tab changes
      refetchOnMount: true, // refetch when component remounts
      refetchOnReconnect: true, // refetch if internet reconnects
    }
  );
};
