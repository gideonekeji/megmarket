import axios from "axios";
import { useMutation } from "react-query";

export const useFetchDefaultLanguage = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  return useMutation(async (status_id: string) => {
    const response = await axios.post(`${baseURL}/fetchDefaultLanguage`, {
      status_id,
    });
    
    return response.data;
  });
};
