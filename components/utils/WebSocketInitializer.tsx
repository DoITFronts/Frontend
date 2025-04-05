import { useEffect } from "react";
import { useStore } from "zustand";

import { connectWebSocket, disconnectWebSocket } from "@/api/socket/websocket";
import chatStore from "@/store/chat/chatStore";
import { getToken } from "@/utils/auth/tokenUtils";

/**
 * 웹소켓 연결을 전역적으로 관리하는 컴포넌트
 * 이 컴포넌트는 레이아웃에 포함되어 채팅방 상태 변화를 감지합니다.
 */
export default function WebSocketInitializer() {
  const isOpen = useStore(chatStore, (state) => state.isOpen);
  const currentRoomId = useStore(chatStore, (state) => state.currentRoomId);

  // 채팅방 상태 변화 감지 및 웹소켓 관리
  useEffect(() => {
    // 토큰 체크
    const token = getToken();
    if (!token) return;

    if (isOpen && currentRoomId) {
      // 채팅방이 열리면 웹소켓 연결
      console.log("WebSocketInitializer: 채팅방 열림, 연결 시도");
      connectWebSocket(token);

      // 컴포넌트 언마운트 시 연결 정리
      return () => {
        if (!chatStore.getState().isOpen) {
          console.log("WebSocketInitializer: 채팅방 닫힘, 연결 종료");
          disconnectWebSocket();
        }
      };
    }
  }, [isOpen, currentRoomId]);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다
  return null;
}
