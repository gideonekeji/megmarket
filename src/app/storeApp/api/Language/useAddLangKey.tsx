import axios from "axios";
import { useMutation } from "react-query";

export const useAddLangKey = () => {
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useMutation(async (key: string) => {
    const response = await axios.post(`${baseURL}/addKey`, { key });
    return response.data;
  });
};
