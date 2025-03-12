import mockMyProfile from '@/api/data/mockMyProfile';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProfileStore extends User {
  updateProfile: (profile: Partial<User>) => void;
  updateProfileImage: (image: string) => void;
  setInitialProfile: (profile: User) => void;
}

const initialProfileState: User = {
  id: 0,
  nickname: '',
  email: '',
  description: null,
  imageUrl: '',
};

const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      ...initialProfileState,

      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
      updateProfileImage: (image) => set((state) => ({ ...state, imageUrl: image })),
      setInitialProfile: (profile) => set(profile),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
      // 메서드를 제외한 데이터만 유지
      partialize: (state) => ({
        id: state.id,
        nickname: state.nickname,
        email: state.email,
        description: state.description,
        imageUrl: state.imageUrl,
      }),
    },
  ),
);

export default useProfileStore;
