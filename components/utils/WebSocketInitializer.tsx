"use client";

import { useEffect } from "react";

import useWebSocketStore from "@/store/chat/websocketStore";
import { getToken } from "@/utils/auth/tokenUtils";

export default function WebSocketInitializer() {
  const { connectWebSocket } = useWebSocketStore();

  useEffect(() => {
    const token = getToken();
    if (token) {
      connectWebSocket(token);
    }
  }, []);

  return null;
}
