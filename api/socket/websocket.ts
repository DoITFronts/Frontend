import { toast } from 'react-toastify';

import withWebSocketAuth from '@/api/middleware/websocketMiddleware';
import chatStore from '@/store/chatStore';

const WS_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/^https?/, 'wss')}/api/v1/ws`;

let socket: WebSocket | null = null;

export const connectWebSocket = withWebSocketAuth((token) => {
  const { currentRoomId } = chatStore.getState();
  if (!currentRoomId) {
    console.error('WebSocket 연결 실패: 채팅방 ID 없음');
    return;
  }

  const wsUrl = `${WS_BASE_URL}?token=${token}`;
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log('✅ WebSocket 연결됨');
    toast.success('채팅방에 입장했습니다.');

    const subscribeMessage = JSON.stringify({
      type: 'SUBSCRIBE',
      destination: `/topic/room/${currentRoomId}`,
    });
    socket?.send(subscribeMessage);
  };

  socket.onmessage = (event) => {
    console.log('📩 메시지 수신:', event.data);
    chatStore.getState().addMessage(event.data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket 오류 발생', error);
    toast.error('웹소켓 연결 오류가 발생했습니다.');
  };

  socket.onclose = () => {
    console.log('🔌 WebSocket 연결 종료');
    toast.info('채팅방에서 나갔습니다.');
    chatStore.getState().clearMessages();
  };
});

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendMessage = (message: string) => {
  const { currentRoomId } = chatStore.getState();
  if (socket && message.trim() && currentRoomId) {
    const chatMessage = JSON.stringify({
      type: 'MESSAGE',
      content: message,
      roomId: currentRoomId,
    });
    socket.send(chatMessage);
  }
};
