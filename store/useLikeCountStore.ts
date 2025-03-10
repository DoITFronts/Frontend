import { create } from 'zustand';

interface LikeStore {
  likedMeetings: Set<string>;
  toggleLike: (meetingId: string) => void;
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

  likedCount: () => get().likedMeetings.size, // 좋아요 개수 반환
}));

export default useLikeCountStore;
