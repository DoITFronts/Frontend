import { toast } from "react-toastify";

import axiosInstance from "@/api/middleware/api";
import { CHAT_FETCH_ERROR, CHAT_JOIN_ERROR } from "@/lib/constants/toast";
import chatStore from "@/store/chat/chatStore";
import { connectWebSocket } from "@/api/socket/websocket";

export const fetchChatMessages = async (roomId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/chat/rooms/${roomId}/messages`,
    );
    return response.data;
  } catch (error) {
    toast.error(CHAT_FETCH_ERROR);
    throw error;
  }
};

export const joinChatRoom = async (roomId: number) => {
  try {
    console.log(`📌 채팅방(${roomId}) 참여 요청`);
    await axiosInstance.post(`/api/v1/chat/rooms/${roomId}/join`);
    chatStore.getState().openChat(roomId);
    setTimeout(() => connectWebSocket(), 500);
  } catch (error) {
    toast.error(CHAT_JOIN_ERROR);
    throw error;
  }
};
