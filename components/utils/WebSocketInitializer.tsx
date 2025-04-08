import { useEffect } from "react";

import { connectGlobalWebSocket } from "@/api/socket/websocket";
import { getToken } from "@/utils/auth/tokenUtils";

/**
 * 웹소켓 연결을 전역적으로 관리하는 컴포넌트
 * 앱 시작 시 자동으로 웹소켓 연결을 초기화합니다.
 */
export default function WebSocketInitializer() {
  useEffect(() => {
    // 앱 시작 시 토큰이 있으면 (로그인 되어 있으면) 웹소켓 연결
    const token = getToken();
    if (token) {
      connectGlobalWebSocket(token);
    }

    // 브라우저 창이 닫힐 때 이벤트 리스너 (필요시 사용)
    const handleBeforeUnload = () => {
      // 필요한 정리 작업 수행
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다
  return null;
}
