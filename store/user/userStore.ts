import { create } from 'zustand';
import { removeToken } from '@/utils/auth/tokenUtils';

//TODO 타입으로 따로 분리
interface UserState {
  userId: number | null;
  nickname: string | null;
  email: string | null;
  isLoggedIn: boolean;
  setUser: (user: { sub: number; nickname: string; email: string }) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  nickname: null,
  email: null,
  isLoggedIn: false,

  // 로그인 후 상태 업데이트
  setUser: (user) =>
    set({
      userId: user.sub,
      nickname: user.nickname,
      email: user.email,
      isLoggedIn: true,
    }),

  // 로그아웃 -> 쿠키 삭제, zustand 초기화
  logout: () => {
    removeToken();
    set({
      userId: null,
      nickname: null,
      email: null,
      isLoggedIn: false,
    });
  },
}));

export default useUserStore;
