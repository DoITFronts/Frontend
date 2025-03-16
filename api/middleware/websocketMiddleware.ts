import { getToken } from '@/utils/auth/tokenUtils';

const withWebSocketAuth = (callback: (token: string) => void) => () => {
  const token = getToken();
  if (!token) {
    console.error('❌ WebSocket 인증 실패: 토큰 없음');
    return;
  }
  callback(token);
};

export default withWebSocketAuth;
