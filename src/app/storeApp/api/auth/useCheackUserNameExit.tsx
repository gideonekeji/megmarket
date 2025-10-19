import { useMutation } from "react-query";
import axios from "axios";

export const useCheackUserNameExit = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useMutation(async (username: string) => {
    const response = await axios.post(`${baseURL}/username-exist`, {
      username,
    });
    return response.data;
  });
};
