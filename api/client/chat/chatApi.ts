import { toast } from "react-toastify";

import axiosInstance from "@/api/middleware/api";
import { CHAT_FETCH_ERROR } from "@/lib/constants/toast";

export const fetchChatMessages = async (roomId: number, size: number = 20) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/chat/rooms/${roomId}/messages`,
      {
        params: {
          size,
        },
      },
    );
    return response.data;
  } catch (error) {
    toast.error(CHAT_FETCH_ERROR);
    throw error;
  }
};
