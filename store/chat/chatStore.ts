import { produce } from "immer";
import { create } from "zustand";

interface ChatMessage {
  id: number;
  roomId: number;
  userId: number;
  userNickname: string;
  content: string;
  createdAt: string;
  userImage?: string;
}

interface ChatState {
  isOpen: boolean;
  currentRoomId: number | null;
  messages: ChatMessage[];
  openChat: (roomId: number) => void;
  closeChat: () => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const chatStore = create<ChatState>((set) => ({
  isOpen: false,
  currentRoomId: null,
  messages: [],

  openChat: (roomId) => {
    console.log(`openChat 호출됨! roomId=${roomId}`);
    set({ isOpen: true, currentRoomId: roomId });
  },

  closeChat: () => {
    console.log("채팅창 닫힘!");
    set({ isOpen: false, currentRoomId: null, messages: [] });
  },

  addMessage: (message) =>
    set(
      produce((state: ChatState) => {
        if (!Array.isArray(state.messages)) {
          state.messages = [];
        }
        state.messages.unshift(message);
      }),
    ),

  clearMessages: () =>
    set(
      produce((state: ChatState) => {
        state.messages = [];
      }),
    ),

  setMessages: (messages) =>
    set(
      produce((state: ChatState) => {
        state.messages = Array.isArray(messages) ? messages : [];
      }),
    ),
}));

export default chatStore;
