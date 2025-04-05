import { useState, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { toast } from "react-toastify";

import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from "@/api/socket/websocket";
import Icon from "@/components/shared/Icon";
import chatStore from "@/store/chat/chatStore";
import { getToken } from "@/utils/auth/tokenUtils";

import ChatMessageList from "./ChatMessageList";

export default function ChatModal() {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const connectionAttempts = useRef(0);

  const isOpen = useStore(chatStore, (state) => state.isOpen);
  const currentRoomId = useStore(chatStore, (state) => state.currentRoomId);
  const closeChat = useStore(chatStore, (state) => state.closeChat);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 채팅방 열림/닫힘에 따른 웹소켓 연결 관리
  useEffect(() => {
    if (isClient) {
      if (isOpen && currentRoomId) {
        console.log("🔄 채팅방 열림, WebSocket 연결 시도", currentRoomId);
        const token = getToken();

        if (token) {
          setIsConnecting(true);
          connectionAttempts.current += 1;

          // 연결 시도
          connectWebSocket(token);

          // 연결 타임아웃 처리
          const timeout = setTimeout(() => {
            setIsConnecting(false);

            // 연결 재시도 (최대 3회)
            if (connectionAttempts.current < 3) {
              console.log(
                `🔄 연결 재시도 (${connectionAttempts.current}/3)...`,
              );
              connectWebSocket(token);
            } else {
              toast.error(
                "채팅 연결에 실패했습니다. 페이지를 새로고침해 주세요.",
              );
            }
          }, 5000);

          return () => {
            clearTimeout(timeout);
          };
        } else {
          toast.error("로그인이 필요합니다.");
        }
      } else if (!isOpen) {
        // 채팅방 닫힐 때 연결 종료
        disconnectWebSocket();
        connectionAttempts.current = 0;
      }
    }
  }, [isClient, isOpen, currentRoomId]);

  // 채팅창이 보이지 않을 경우 렌더링하지 않음
  if (!isClient || !isOpen || !currentRoomId) return null;

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (message.trim()) {
      // 입력값 트림하여 맥북에서 마지막 글자 반복 문제 방지
      const trimmedMessage = message.trim();
      sendMessage(trimmedMessage);
      setMessage("");
    }
  };

  // 입력 중 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 폼 제출 방지
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-10 flex h-[500px] w-[400px] flex-col rounded-xl bg-white shadow-lg dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-bold">💬 채팅방 {currentRoomId}</h2>
        <button
          type="button"
          onClick={() => {
            closeChat();
          }}
          className="text-gray-500 hover:text-gray-300"
        >
          <Icon path="/X" />
        </button>
      </div>
      <ChatMessageList roomId={currentRoomId} />
      <div className="flex items-center gap-2 border-t bg-gray-50 px-4 py-3 dark:bg-gray-700">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-md border bg-gray-100 p-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="메시지를 입력하세요"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={isConnecting}
          className="rounded-md p-2 text-white hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          <Icon path="/chat/send" />
        </button>
      </div>
    </div>
  );
}
