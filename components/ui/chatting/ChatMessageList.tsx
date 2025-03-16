import React, { useEffect, useRef } from "react";
import { useStore } from "zustand";

import ChatMessage from "@/components/ui/chatting/ChattingMessage";
import useChatMessages from "@/hooks/chat/useChatMessages";
import chatStore from "@/store/chatStore";

interface ChatMessageListProps {
  roomId: number;
}

export default function ChatMessageList({ roomId }: ChatMessageListProps) {
  const messages = useStore(chatStore, (state) => state.messages);
  const setMessages = useStore(chatStore, (state) => state.setMessages);

  const { data: initialMessages, isLoading, error } = useChatMessages(roomId);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialMessages) {
      console.log("📜 기존 메시지 설정됨:", initialMessages);
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading)
    return <p className="text-center text-gray-500">메시지 불러오는 중...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        메시지를 불러오는 중 오류 발생!
      </p>
    );

  return (
    <div className="flex-1 space-y-2 overflow-y-auto bg-gray-100 p-4 dark:bg-gray-800">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          메시지가 없습니다.
        </p>
      ) : (
        messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            userNickname={msg.userNickname}
            content={msg.content}
            userId={msg.userId}
            createdAt={msg.createdAt}
          />
        ))
      )}
      <div ref={messageEndRef} />
    </div>
  );
}
