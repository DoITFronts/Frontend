import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";

import chatStore from "@/store/chat/chatStore";
import { CHAT_SOCKET_ERROR, CHAT_ENTER_SUCCESS } from "@/lib/constants/toast";

// 전역 STOMP 클라이언트 인스턴스 유지
let stompClient: Client | null = null;
let subscribedRoomId: number | null = null;
let isConnecting = false; // 연결 시도 중인지 추적

// 웹소켓 연결 함수
export const connectWebSocket = async (token: string) => {
  const { currentRoomId } = chatStore.getState();

  // 채팅방 ID가 없으면 연결 시도하지 않음
  if (!currentRoomId) {
    console.error("❌ WebSocket 연결 실패: 채팅방 ID 없음");
    return;
  }

  // 이미 연결 중이면 중복 연결 방지
  if (isConnecting) {
    console.log("⏳ WebSocket 연결 진행 중...");
    return;
  }

  // 이미 연결되어 있고 같은 채팅방이면 재연결하지 않음
  if (
    stompClient &&
    stompClient.connected &&
    subscribedRoomId === currentRoomId
  ) {
    console.log("🔄 기존 WebSocket 유지: 같은 채팅방");
    return;
  }

  // 다른 채팅방으로 이동하는 경우 기존 구독 해제
  if (
    stompClient &&
    stompClient.connected &&
    subscribedRoomId !== currentRoomId
  ) {
    console.log(`📌 채팅방 변경: ${subscribedRoomId} → ${currentRoomId}`);

    try {
      if (subscribedRoomId) {
        stompClient.unsubscribe(`/topic/room/${subscribedRoomId}`);
      }

      // 메시지 핸들러 함수 정의
      const handleMessage = (response: { body: string }) => {
        console.log("📩 메시지 수신:", response.body);
        try {
          const message = JSON.parse(response.body);
          chatStore.getState().addMessage(message);
        } catch (error) {
          console.error("❌ 메시지 파싱 오류:", error);
        }
      };

      subscribedRoomId = currentRoomId;
      stompClient.subscribe(`/topic/room/${currentRoomId}`, handleMessage);
      console.log(`✅ 새 채팅방(${currentRoomId}) 구독 성공`);
      return;
    } catch (error) {
      console.error("❌ 채팅방 변경 중 오류:", error);
      // 오류 발생 시 연결 재설정
      disconnectWebSocket();
    }
  }

  // 새 연결 시도
  isConnecting = true;
  console.log(`🟢 WebSocket 연결 시도: Room ID - ${currentRoomId}`);

  try {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ws?token=${token}`,
    );

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
    });

    // 메시지 핸들러 설정
    const handleIncomingMessage = (response: { body: string }) => {
      console.log("📩 메시지 수신:", response.body);
      try {
        const message = JSON.parse(response.body);
        chatStore.getState().addMessage(message);
      } catch (error) {
        console.error("❌ 메시지 파싱 오류:", error);
      }
    };

    // 연결 이벤트 핸들러
    stompClient.onConnect = () => {
      console.log("✅ WebSocket 연결 성공!");
      isConnecting = false;
      subscribedRoomId = currentRoomId;

      try {
        // 메시지 핸들러 함수 정의
        const handleMessage = (response: { body: string }) => {
          console.log("📩 메시지 수신:", response.body);
          try {
            const message = JSON.parse(response.body);
            chatStore.getState().addMessage(message);
          } catch (error) {
            console.error("❌ 메시지 파싱 오류:", error);
          }
        };

        stompClient?.subscribe(`/topic/room/${currentRoomId}`, handleMessage);
        console.log(`✅ 채팅방(${currentRoomId}) 구독 성공`);
        toast.success(CHAT_ENTER_SUCCESS);
      } catch (subscribeError) {
        console.error("❌ 채팅방 구독 실패:", subscribeError);
        toast.error("채팅방 연결에 문제가 있습니다. 다시 시도해주세요.");
      }
    };

    // 오류 핸들러
    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP 오류 발생:", frame);
      isConnecting = false;
      toast.error(CHAT_SOCKET_ERROR);
    };

    stompClient.onWebSocketError = (error) => {
      console.error("❌ WebSocket 오류 발생:", error);
      isConnecting = false;
      toast.error("채팅 서버 연결 오류. 잠시 후 다시 시도해주세요.");
    };

    stompClient.onDisconnect = () => {
      console.warn("🔌 WebSocket 연결 종료! 재연결 시도...");
      isConnecting = false;
      setTimeout(() => {
        if (chatStore.getState().isOpen) {
          // 채팅방이 여전히 열려있을 때만 재연결
          connectWebSocket(token);
        }
      }, 5000);
    };

    // 연결 활성화
    stompClient.activate();
  } catch (error) {
    console.error("❌ WebSocket 설정 중 오류:", error);
    isConnecting = false;
    toast.error(CHAT_SOCKET_ERROR);
  }
};

// 웹소켓 연결 종료
export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log("🔌 WebSocket 연결 종료 중...");
    try {
      stompClient.deactivate();
      toast.info("채팅방에서 나갔습니다.");
    } catch (error) {
      console.error("❌ WebSocket 연결 종료 중 오류:", error);
    } finally {
      stompClient = null;
      subscribedRoomId = null;
      isConnecting = false;
    }
  }
};

// 메시지 전송
export const sendMessage = (message: string) => {
  const { currentRoomId, addMessage } = chatStore.getState();

  if (!stompClient || !stompClient.connected) {
    console.error("❌ 메시지 전송 실패: WebSocket이 연결되지 않음");

    // 연결이 되어 있지 않으면 자동으로 재연결 시도
    const token = localStorage.getItem("accessToken");
    if (token) {
      toast.info("채팅 서버에 다시 연결 중...");
      connectWebSocket(token);

      // 메시지 임시 저장 (재시도 로직 구현 가능)
      setTimeout(() => {
        if (stompClient && stompClient.connected) {
          sendMessage(message);
        } else {
          toast.error("메시지 전송 실패. 다시 시도해주세요.");
        }
      }, 2000);
    } else {
      toast.error("로그인이 필요합니다.");
    }
    return;
  }

  if (!message.trim() || !currentRoomId) {
    console.error("❌ 메시지 전송 실패: 메시지 또는 채팅방 ID 없음");
    return;
  }

  try {
    // 실제 전송
    stompClient.publish({
      destination: `/app/room/${currentRoomId}/sendMessage`,
      body: JSON.stringify({ content: message.trim() }), // 맥북 이슈 방지를 위해 trim() 추가
    });

    console.log("📤 메시지 전송 성공");
  } catch (error) {
    console.error("❌ 메시지 전송 중 오류:", error);
    toast.error("메시지 전송에 실패했습니다.");
  }
};
