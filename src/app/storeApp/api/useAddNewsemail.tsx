import { useMutation } from "react-query";
import axios from "axios";

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const useAddNewsemail = () => {
  return useMutation(async (email: string) => {
    const response = await axios.post(`${baseURL}/add-newsemail`, { email });
    return response.data;
  });
};
