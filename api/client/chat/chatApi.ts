import axios from 'axios';

const API_BASE_URL = '/api/v1/chat';

export const fetchChatRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`);
  return response.data;
};

export const fetchChatMessages = async (roomId: string) => {
  const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}/messages`);
  return response.data;
};

export const joinChatRoom = async (roomId: string) => {
  const response = await axios.post(`${API_BASE_URL}/rooms/${roomId}/join`);
  return response.data;
};
