import { useState, useEffect } from "react";
import { useStore } from "zustand";

import { sendMessage } from "@/api/socket/websocket";
import Icon from "@/components/shared/Icon";
import chatStore from "@/store/chat/chatStore";
import useWebSocketStore from "@/store/chat/websocketStore";
import { getToken } from "@/utils/auth/tokenUtils";

import ChatMessageList from "./ChatMessageList";

export default function ChatModal() {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");

  const isOpen = useStore(chatStore, (state) => state.isOpen);
  const currentRoomId = useStore(chatStore, (state) => state.currentRoomId);
  const closeChat = useStore(chatStore, (state) => state.closeChat);
  const { connectWebSocket, isConnected } = useWebSocketStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen && currentRoomId) {
      console.log("🔄 채팅방 열림, WebSocket 상태 확인!");
      if (!isConnected) {
        const token = getToken();
        if (token) {
          connectWebSocket(token);
        }
      }
    }
  }, [isOpen, currentRoomId, isConnected]);

  if (!isClient || !isOpen || !currentRoomId) return null;
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
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
          className="flex-1 rounded-md border bg-gray-100 p-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
