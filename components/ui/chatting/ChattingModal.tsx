'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/shared/Icon';
import useWebSocket from '@/hooks/useWebSocket';
import useChatStore from '@/store/chatStore';

export default function ChatModal() {
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Zustand 상태 가져오기
  const { isOpen, currentRoomId, messages, closeChat } = useChatStore();
  const token = 'YOUR_BEARER_TOKEN';

  // WebSocket 훅 사용
  const { sendMessage } = useWebSocket(token);

  // 채팅 모달 닫힐 때 입력 필드 초기화
  useEffect(() => {
    if (!isOpen) setMessage('');
  }, [isOpen]);

  // 채팅 메시지를 전송하는 함수
  const handleSendMessage = () => {
    if (message.trim() && currentRoomId) {
      sendMessage(message);
      setMessage('');
    }
  };

  // 스크롤을 항상 최신 메시지로 이동
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen || !currentRoomId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-2xl bg-white p-6 text-black shadow-xl dark:bg-gray-900 dark:text-white">
        {/* 채팅 헤더 */}
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-bold">채팅방 {currentRoomId}</h2>
          <button type="button" onClick={closeChat} className="text-gray-500 hover:text-gray-300">
            <Icon path="/assets/X" />
          </button>
        </div>

        {/* 채팅 메시지 리스트 */}
        <div className="h-64 space-y-2 overflow-y-auto rounded-md border bg-gray-100 p-2 dark:bg-gray-800">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">메시지가 없습니다.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="rounded-md bg-gray-200 p-2 dark:bg-gray-700">
                {msg}
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>

        {/* 입력창 */}
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