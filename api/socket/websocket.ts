import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";

import withWebSocketAuth from "@/api/middleware/websocketMiddleware";
import chatStore from "@/store/chat/chatStore";

let stompClient: Client | null = null;
let subscribedRoomId: number | null = null;

export const connectWebSocket = withWebSocketAuth((token) => {
  const { currentRoomId, addMessage } = chatStore.getState();

  if (!currentRoomId) {
    console.error("❌ WebSocket 연결 실패: 채팅방 ID 없음");
    return;
  }
  if (stompClient && stompClient.connected) {
    console.log("🔄 기존 WebSocket 유지");
    if (subscribedRoomId !== currentRoomId) {
      console.log(`📌 새로운 채팅방(${currentRoomId}) 구독`);
      stompClient.unsubscribe(`/topic/room/${subscribedRoomId}`);

      setTimeout(() => {
        subscribedRoomId = currentRoomId;
        stompClient?.subscribe(`/topic/room/${currentRoomId}`, (response) => {
          console.log("📩 메시지 수신:", response.body);
          const message = JSON.parse(response.body);
          addMessage(message);
        });
      }, 300);
    }
    return;
  }

  console.log(`🟢 WebSocket 연결 시도: Room ID - ${currentRoomId}`);

  const socket = new SockJS(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ws?token=${token}`,
  );

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  stompClient.onConnect = () => {
    console.log("✅ WebSocket 연결 성공!");
    subscribedRoomId = currentRoomId;

    if (stompClient) {
      console.log(`🔔 STOMP 구독 요청: /topic/room/${currentRoomId}`);
      stompClient.subscribe(`/topic/room/${currentRoomId}`, (response) => {
        console.log("📩 메시지 수신:", response.body);
        const message = JSON.parse(response.body);
        addMessage(message);
      });

      stompClient.onStompError = (frame) => {
        console.error("❌ STOMP 오류 발생:", frame);
        toast.error("채팅 서버 오류가 발생했습니다.");
      };
    }
  };

  stompClient.onWebSocketError = (error) => {
    console.error("❌ WebSocket 연결 오류:", error);
    toast.error("채팅 서버와 연결이 끊어졌습니다. 다시 연결 시도 중...");
  };

  stompClient.onDisconnect = () => {
    console.warn("🔌 WebSocket 연결 종료됨! 다시 연결을 시도합니다...");
    setTimeout(() => connectWebSocket(token), 5000);
  };

  stompClient.activate();
});

export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log("🔌 WebSocket 연결 종료");
    stompClient.deactivate();
    stompClient = null;
    subscribedRoomId = null;
  }
};

export const sendMessage = (message: string) => {
  const { currentRoomId } = chatStore.getState();

  if (!stompClient || !stompClient.connected) {
    console.error("❌ 메시지 전송 실패: WebSocket이 연결되지 않음");
    toast.error("채팅 서버와 연결되지 않았습니다. 다시 시도해주세요.");
    return;
  }

  if (!message.trim() || !currentRoomId) {
    console.error("❌ 메시지 전송 실패: 메시지 또는 채팅방 ID 없음");
    return;
  }

  console.log("📤 메시지 전송:", message);

  stompClient.publish({
    destination: `/app/room/${currentRoomId}/sendMessage`,
    body: JSON.stringify({ content: message }),
  });
};
