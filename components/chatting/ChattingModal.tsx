import { useState, useEffect } from "react";
import { useStore } from "zustand";

import { sendMessage, subscribeToRoom } from "@/api/socket/websocket";
import Icon from "@/components/shared/Icon";
import chatStore from "@/store/chat/chatStore";

import ChatMessageList from "./ChatMessageList";

export default function ChatModal() {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태 추적

  const isOpen = useStore(chatStore, (state) => state.isOpen);
  const currentRoomId = useStore(chatStore, (state) => state.currentRoomId);
  const closeChat = useStore(chatStore, (state) => state.closeChat);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 채팅방 입장 시 구독 처리
  useEffect(() => {
    if (isClient && isOpen && currentRoomId) {
      console.log("🔄 채팅방 열림, 채팅방 구독 시도");
      // 채팅방 구독 요청
      subscribeToRoom(currentRoomId);
    }
  }, [isClient, isOpen, currentRoomId]);

  if (!isClient || !isOpen || !currentRoomId) return null;

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
    }
  };

  // 입력 값 변경 처리 (한글 입력 이슈 대응)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 한글 조합 시작/종료 이벤트 처리
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // 키 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
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
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-md border bg-gray-100 p-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="메시지를 입력하세요"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="rounded-md p-2 text-white hover:opacity-80 dark:bg-white dark:text-black"
        >
          <Icon path="/chat/send" />
        </button>
      </div>
    </div>
  );
}
