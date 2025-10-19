import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { InnerChatListRes } from "@/app/types/Restypes";

export const useInnerChatList = (from_user: string, to_user: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useQuery<InnerChatListRes>(
    ["inner-chat", from_user, to_user],
    async () => {
      const token = Cookies.get("nlyticalwebtoken");

      const response = await axios.post<InnerChatListRes>(
        `${baseURL}/inner-chat`,
        { from_user, to_user },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return response.data;
    },
    {
      refetchInterval: 1000, // fetch every 1 second
      refetchIntervalInBackground: true, // keep fetching even if tab not focused
      refetchOnWindowFocus: false, // prevent extra fetch on focus
    }
  );
};
