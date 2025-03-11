import { create } from 'zustand';

interface ChatState {
  isOpen: boolean;
  currentRoomId: string | null;
  messages: string[];
  openChat: (roomId: string) => void;
  closeChat: () => void;
  addMessage: (message: string) => void;
  clearMessages: () => void;
}

const chatStore = create<ChatState>((set) => ({
  isOpen: false,
  currentRoomId: null,
  messages: [],
  openChat: (roomId) => set({ isOpen: true, currentRoomId: roomId }),
  closeChat: () => set({ isOpen: false, currentRoomId: null }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default chatStore;
