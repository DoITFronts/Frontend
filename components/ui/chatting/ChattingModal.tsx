'use client';

import { useState, useEffect, useRef } from 'react';

import { connectWebSocket, disconnectWebSocket, sendMessage } from '@/api/socket/websocket';
import Icon from '@/components/shared/Icon';
import chatStore from '@/store/chatStore';

export default function ChatModal() {
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, currentRoomId, messages, closeChat } = chatStore();

  useEffect(() => {
    if (currentRoomId) {
      connectWebSocket();
    }
    return () => {
      disconnectWebSocket();
    };
  }, [currentRoomId]);
  useEffect(() => {
    if (!isOpen) setMessage('');
  }, [isOpen]);
  const handleSendMessage = () => {
    if (message.trim() && currentRoomId) {
      sendMessage(message);
      setMessage('');
    }
  };
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen || !currentRoomId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-2xl bg-white p-6 text-black shadow-xl dark:bg-gray-900 dark:text-white">
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-bold">채팅방 {currentRoomId}</h2>
          <button
            type="button"
            onClick={() => {
              closeChat();
              disconnectWebSocket();
            }}
            className="text-gray-500 hover:text-gray-300"
          >
            <Icon path="/assets/X" />
          </button>
        </div>
        <div className="h-64 space-y-2 overflow-y-auto rounded-md border bg-gray-100 p-2 dark:bg-gray-800">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">메시지가 없습니다.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg} className="rounded-md bg-gray-200 p-2 dark:bg-gray-700">
                {msg}
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="메시지를 입력하세요"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // 엔터 입력 시 메시지 전송
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className="rounded-md bg-black p-2 text-white hover:opacity-80 dark:bg-white dark:text-black"
          >
            <Icon path="/assets/chat" />
          </button>
        </div>
      </div>
    </div>
  );
}
