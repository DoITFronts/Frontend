import { create } from 'zustand';

interface UserState {
  userId: number | null;
  profileImage: string | null;
  isLoggedIn: boolean;
  setUser: (user: { sub: number; profileImage: string | null }) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  profileImage: null,
  isLoggedIn: false,
  setUser: (user) =>
    set({
      userId: user.sub,
      profileImage: user.profileImage,
      isLoggedIn: true,
    }),
  logout: () => set({ userId: null, profileImage: null, isLoggedIn: false }),
}));

export default useUserStore;
