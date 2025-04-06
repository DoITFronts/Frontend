import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";

import { getToken } from "@/utils/auth/tokenUtils";
import chatStore from "@/store/chat/chatStore";
import profileStore from "@/store/profileStore";
import { CHAT_SOCKET_ERROR, CHAT_ENTER_SUCCESS } from "@/lib/constants/toast";

// 전역 변수
let stompClient: Client | null = null;
let subscribedRoomId: number | null = null;
let isConnecting = false;

// 전역 웹소켓 연결 함수 - 로그인 시 호출
export const connectGlobalWebSocket = (token: string) => {
  // 이미 연결되어 있으면 무시
  if (stompClient && stompClient.connected) {
    console.log("🌐 웹소켓 이미 연결됨");
    return;
  }

  // 이미 연결 중이면 중복 연결 방지
  if (isConnecting) {
    console.log("⏳ WebSocket 연결 진행 중...");
    return;
  }

  isConnecting = true;
  console.log("🌐 웹소켓 연결 시작...");

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

    stompClient.onConnect = () => {
      console.log("✅ 웹소켓 연결 성공!");
      isConnecting = false;

      // 현재 열려있는 채팅방이 있으면 자동 구독
      const currentRoomId = chatStore.getState().currentRoomId;
      if (currentRoomId) {
        subscribeToRoom(currentRoomId);
      }
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP 오류:", frame);
      isConnecting = false;
      toast.error(CHAT_SOCKET_ERROR);
    };

    stompClient.onWebSocketError = (error) => {
      console.error("❌ WebSocket 오류:", error);
      isConnecting = false;
      toast.error("채팅 서버 연결 오류가 발생했습니다.");
    };

    stompClient.onDisconnect = () => {
      console.warn("🔌 WebSocket 연결 종료! 재연결 시도...");
      isConnecting = false;

      // 자동 재연결 (로그인 상태일 때만)
      setTimeout(() => {
        const token = getToken();
        if (token) {
          connectGlobalWebSocket(token);
        }
      }, 5000);
    };

    stompClient.activate();
  } catch (error) {
    console.error("❌ WebSocket 설정 중 오류:", error);
    isConnecting = false;
  }
};

// 웹소켓 연결 종료 - 로그아웃 시 호출
export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log("🔌 WebSocket 연결 종료");
    try {
      stompClient.deactivate();
    } catch (error) {
      console.error("WebSocket 연결 종료 중 오류:", error);
    } finally {
      stompClient = null;
      subscribedRoomId = null;
      isConnecting = false;
    }
  }
};

// 채팅방 구독 함수 - 채팅방 입장 시 호출
export const subscribeToRoom = (roomId: number) => {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ 채팅방 구독 실패: 웹소켓 연결이 없음");
    // 연결이 없으면 토큰으로 새로 연결 시도
    const token = getToken();
    if (token) {
      connectGlobalWebSocket(token);
      // 연결 후 구독 시도를 위한 타임아웃 설정
      setTimeout(() => {
        if (stompClient && stompClient.connected) {
          subscribeToRoom(roomId);
        } else {
          toast.error(
            "채팅 서버에 연결할 수 없습니다. 새로고침 후 다시 시도해주세요.",
          );
        }
      }, 1000);
    } else {
      toast.error("로그인이 필요합니다.");
    }
    return;
  }

  // 이미 같은 방에 구독 중이면 무시
  if (subscribedRoomId === roomId) {
    console.log(`📌 이미 채팅방(${roomId})에 구독 중`);
    return;
  }

  // 기존 구독이 있으면 해제
  if (subscribedRoomId !== null) {
    try {
      stompClient.unsubscribe(`/topic/room/${subscribedRoomId}`);
      console.log(`📌 이전 채팅방(${subscribedRoomId}) 구독 해제`);
    } catch (error) {
      console.error("구독 해제 중 오류:", error);
    }
  }

  // 새 채팅방 구독
  try {
    subscribedRoomId = roomId;
    stompClient.subscribe(`/topic/room/${roomId}`, (response) => {
      console.log("📩 메시지 수신:", response.body);
      try {
        const message = JSON.parse(response.body);
        chatStore.getState().addMessage(message);
      } catch (error) {
        console.error("❌ 메시지 파싱 오류:", error);
      }
    });
    console.log(`✅ 채팅방(${roomId}) 구독 성공`);
    toast.success(CHAT_ENTER_SUCCESS);
  } catch (error) {
    console.error("❌ 채팅방 구독 중 오류:", error);
    subscribedRoomId = null;
  }
};

// 메시지 전송 함수
export const sendMessage = (message: string) => {
  const { currentRoomId } = chatStore.getState();

  if (!stompClient || !stompClient.connected) {
    console.error("❌ 메시지 전송 실패: WebSocket이 연결되지 않음");
    toast.error("채팅 서버와 연결되지 않았습니다. 다시 시도해주세요.");

    // 자동 재연결 시도
    const token = getToken();
    if (token) {
      connectGlobalWebSocket(token);
    }
    return;
  }

  if (!message.trim() || !currentRoomId) {
    console.error("❌ 메시지 전송 실패: 메시지 또는 채팅방 ID 없음");
    return;
  }

  const {
    id: userId,
    nickname: userNickname,
    imageUrl: userImage,
  } = profileStore.getState();

  // 낙관적 업데이트용 임시 메시지 객체
  const newMessage = {
    id: Date.now(),
    roomId: currentRoomId,
    userId,
    userNickname,
    content: message.trim(), // 맥북 이슈 방지를 위해 trim 사용
    createdAt: new Date().toISOString(),
    userImage,
  };

  // // 메시지 미리 보여주기 (낙관적 업데이트)
  // chatStore.getState().addMessage(newMessage);

  try {
    // 실제 서버로 메시지 전송
    stompClient.publish({
      destination: `/app/room/${currentRoomId}/sendMessage`,
      body: JSON.stringify({ content: message.trim() }),
    });
    console.log("📤 메시지 전송 성공");
  } catch (error) {
    console.error("❌ 메시지 전송 중 오류:", error);
    toast.error("메시지 전송에 실패했습니다.");
  }
};

// 기존 connectWebSocket 함수는 일단 그대로 두고,
// 내부적으로 전역 연결 함수를 호출하도록 변경 (호환성 유지)
export const connectWebSocket = () => {
  const token = getToken();
  if (!token) {
    console.error("❌ WebSocket 인증 실패: 토큰 없음");
    return;
  }

  connectGlobalWebSocket(token);

  // 채팅방 ID가 있으면 구독
  const { currentRoomId } = chatStore.getState();
  if (currentRoomId && stompClient && stompClient.connected) {
    subscribeToRoom(currentRoomId);
  }
};
