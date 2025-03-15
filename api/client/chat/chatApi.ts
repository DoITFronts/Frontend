import axios from 'axios';

const API_BASE_URL = '/api/v1/chat';

// ✅ 채팅방 목록 조회
export const fetchChatRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`);
  return response.data;
};

// ✅ 채팅방 생성
export const createChatRoom = async () => {
  const response = await axios.post(`${API_BASE_URL}/rooms`);
  return response.data;
};

// ✅ 특정 채팅방 메시지 목록 조회
export const fetchChatMessages = async (roomId: string) => {
  const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}/messages`);
  return response.data;
};

// ✅ 채팅방 입장
export const joinChatRoom = async (roomId: string) => {
  const response = await axios.post(`${API_BASE_URL}/rooms/${roomId}/join`);
  return response.data;
};
