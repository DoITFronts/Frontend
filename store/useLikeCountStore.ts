import { create } from 'zustand';

interface LikeStore {
  likedMeetings: Set<string>;
  toggleLike: (meetingId: string) => void;
  setLikedMeetings: (meetingIds: string[]) => void;
  likedCount: () => number;
}

const useLikeCountStore = create<LikeStore>((set, get) => ({
  likedMeetings: new Set(),

  toggleLike: (meetingId) =>
    set((state) => {
      const newLikes = new Set(state.likedMeetings);
      if (newLikes.has(meetingId)) newLikes.delete(meetingId);
      else newLikes.add(meetingId);
      return { likedMeetings: newLikes };
    }),

  setLikedMeetings: (meetingIds) => set({ likedMeetings: new Set(meetingIds) }), // 서버 데이터 동기화

  likedCount: () => get().likedMeetings.size,
}));

export default useLikeCountStore;
