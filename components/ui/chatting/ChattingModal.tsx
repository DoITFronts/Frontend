import { useState, useEffect } from "react";
import { useStore } from "zustand";

import { sendMessage } from "@/api/socket/websocket";
import Icon from "@/components/shared/Icon";
import chatStore from "@/store/chatStore";
import ChatMessageList from "./ChatMessageList";

export default function ChatModal() {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");

  // Zustand 상태 가져오기
  const isOpen = useStore(chatStore, (state) => state.isOpen);
  const currentRoomId = useStore(chatStore, (state) => state.currentRoomId);
  const closeChat = useStore(chatStore, (state) => state.closeChat);

  // 클라이언트에서만 Zustand 상태를 적용하기 위한 useEffect
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트가 아니거나 채팅방이 열리지 않으면 렌더링 안 함
  if (!isClient || !isOpen || !currentRoomId) return null;

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim()); // 🚀 WebSocket을 통해 메시지 전송
      setMessage(""); // ✅ 메시지 입력 필드 초기화
    }
  };

  return (
    <div className="fixed bottom-24 right-10 flex h-[500px] w-[400px] flex-col rounded-xl bg-white shadow-lg dark:bg-gray-900 dark:text-white">
      {/* 헤더 */}
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

      {/* 메시지 리스트 */}
      <ChatMessageList roomId={currentRoomId} />

      {/* 입력창 */}
      <div className="flex items-center gap-2 border-t bg-gray-50 px-4 py-3 dark:bg-gray-700">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-md border bg-gray-100 p-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // 🚀 엔터 입력 시 메시지 전송
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="rounded-md bg-black p-2 text-white hover:opacity-80 dark:bg-white dark:text-black"
        >
          <Icon path="/chat/send" />
        </button>
      </div>
    </div>
  );
}
