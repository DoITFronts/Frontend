import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  setUserTheme: (sub: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light', // 기본값
  setUserTheme: (sub: string) => {
    const isOdd = Number(sub) % 2 !== 0;
    set({ theme: isOdd ? 'light' : 'dark' });
  },
}));