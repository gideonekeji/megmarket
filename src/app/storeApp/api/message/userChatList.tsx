import { useQuery } from "react-query";
import axios from "axios";
import { MessageListRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation"; // for app router

export const useUserChatList = (searchQuery: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  const cookieUserId = Cookies.get("user_id");
  const token = Cookies.get("nlyticalwebtoken");
  const pathname = usePathname(); // get current path


  console.log("pathnamepathname" , pathname)

  return useQuery<MessageListRes>(
    ["chat-list", cookieUserId, searchQuery],
    async () => {
      const response = await axios.post<MessageListRes>(
        `${baseURL}/chat-list`,
        {
          user_id: cookieUserId,
          first_name: searchQuery,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
      enabled: pathname === "/message" && !!cookieUserId, // only run on /message and if userId exists
    }
  );
};
