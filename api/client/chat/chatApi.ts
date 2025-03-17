import axiosInstance from "@/api/middleware/api";

const fetchChatMessages = async (roomId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/chat/rooms/${roomId}/messages`,
    );
    return response.data;
  } catch (error) {
    console.error("채팅 메시지 불러오기 실패:", error);
    throw error;
  }
};

export default fetchChatMessages;
