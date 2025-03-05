import { create } from 'zustand';

interface ProfileStore extends User {
  updateProfile: (profile: Partial<User>) => void;
  updateProfileImage: (image: string) => void;
  setInitialProfile: (profile: User) => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  ...mockMyProfile,

  updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
  updateProfileImage: (image) => set((state) => ({ ...state, profileImage: image })),
  setInitialProfile: (profile) => set(profile),
}));

export default useProfileStore;
