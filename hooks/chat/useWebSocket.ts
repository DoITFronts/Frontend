import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import useChatStore from '@/store/chatStore';

const WS_BASE_URL = 'wss://coen.store/api/v1/ws';

const useWebSocket = (token: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const { currentRoomId, addMessage, clearMessages } = useChatStore();

  useEffect(() => {
    if (currentRoomId) {
      const wsUrl = `${WS_BASE_URL}?token=${token}`;
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        console.log('WebSocket 연결됨');
        toast.success('채팅방에 입장했습니다.', { autoClose: 900 });

        const subscribeMessage = JSON.stringify({
          type: 'SUBSCRIBE',
          destination: `/topic/room/${currentRoomId}`,
        });
        socketRef.current?.send(subscribeMessage);
      };

      socketRef.current.onmessage = (event) => {
        console.log('메시지 수신:', event.data);
        addMessage(event.data);
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket 오류 발생', error);
        toast.error('웹소켓 연결 오류가 발생했습니다.');
      };

      socketRef.current.onclose = () => {
        console.log('🔌 WebSocket 연결 종료');
        toast.info('채팅방에서 나갔습니다.');
        clearMessages();
      };

      return () => {
        socketRef.current?.close();
      };
    }
    return undefined;
  }, [currentRoomId, token, addMessage, clearMessages]);

  const sendMessage = (message: string) => {
    if (socketRef.current && message.trim()) {
      const chatMessage = JSON.stringify({
        type: 'MESSAGE',
        content: message,
        roomId: currentRoomId,
      });
      socketRef.current.send(chatMessage);
    }
  };

  return { sendMessage };
};

export default useWebSocket;
