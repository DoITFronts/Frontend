import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import { create } from "zustand";

import { CHAT_ENTER_SUCCESS, CHAT_SOCKET_ERROR } from "@/lib/constants/toast";

interface WebSocketState {
  stompClient: Client | null;
  isConnected: boolean;
  connectWebSocket: (token: string) => void;
  disconnectWebSocket: () => void;
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  stompClient: null,
  isConnected: false,

  connectWebSocket: (token) => {
    const existingClient = get().stompClient;
    if (existingClient && get().isConnected) {
      console.log("WebSocket이 이미 연결됨!");
      return;
    }

    console.log("WebSocket 연결 시작!");

    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ws?token=${token}`,
    );

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("WebSocket 연결 성공!");
        toast.success(CHAT_ENTER_SUCCESS);
        set({ isConnected: true });
      },

      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
        toast.error(CHAT_SOCKET_ERROR);
        set({ isConnected: false });
      },

      onWebSocketClose: () => {
        console.warn("WebSocket이 끊어짐! 5초 후 재연결 시도");
        set({ isConnected: false });

        setTimeout(() => {
          if (!get().isConnected) {
            get().connectWebSocket(token);
          }
        }, 5000);
      },
    });

    stompClient.activate();

    set({ stompClient, isConnected: true });
  },

  disconnectWebSocket: () => {
    set((state) => {
      if (state.stompClient) {
        console.log("🔌 WebSocket 연결 해제");
        state.stompClient.deactivate();
      }
      return { stompClient: null, isConnected: false };
    });
  },
}));

export default useWebSocketStore;
