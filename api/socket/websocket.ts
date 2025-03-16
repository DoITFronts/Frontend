import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";

import withWebSocketAuth from "@/api/middleware/websocketMiddleware";
import { CHAT_ENTER_SUCCESS, CHAT_SEND_ERROR, CHAT_SOCKET_ERROR } from "@/lib/constants/toast";
import chatStore from "@/store/chatStore";

let stompClient: Client | null = null;

export const connectWebSocket = withWebSocketAuth((token) => {
  const { currentRoomId, addMessage } = chatStore.getState();
  if (!currentRoomId) {
    console.error("WebSocket 연결 실패: 채팅방 ID 없음");
    return;
  }

  console.log(`🟢 WebSocket 연결 시도: Room ID - ${currentRoomId}`);

  const socket = new SockJS(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ws?token=${token}`,
  );

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    console.log("WebSocket 연결 성공!");
    toast.success(CHAT_ENTER_SUCCESS, { autoClose: 900 });

    if (stompClient) {
      console.log(`STOMP 구독 요청: /topic/room/${currentRoomId}`);
      stompClient.subscribe(`/topic/room/${currentRoomId}`, (response) => {
        console.log("메시지 수신:", response.body);
        const message = JSON.parse(response.body);
        addMessage(message);
      });

      stompClient.onStompError = (frame) => {
        console.error("STOMP 오류 발생:", frame);
        toast.error(CHAT_SOCKET_ERROR);
      };
    }
  };

  stompClient.onWebSocketError = (error) => {
    console.error("WebSocket 연결 오류:", error);
    toast.error(CHAT_SOCKET_ERROR);
  };

  stompClient.activate();
});

export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log("🔌 WebSocket 연결 종료");
    stompClient.deactivate();
    stompClient = null;
  }
};

export const sendMessage = (message: string) => {
  const { currentRoomId } = chatStore.getState();
  if (stompClient && stompClient.connected && message.trim() && currentRoomId) {
    console.log(`📤 메시지 전송: ${message}`);
    stompClient.publish({
      destination: `/app/room/${currentRoomId}/sendMessage`,
      body: JSON.stringify({ content: message }),
    });
  } else {
    console.error("메시지 전송 실패: WebSocket이 연결되지 않음");
    toast.error(CHAT_SEND_ERROR);
  }
};
