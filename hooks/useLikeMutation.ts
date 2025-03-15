import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';

import toggleLike from '@/api/meeting/toggleLike';
import { Meeting } from '@/types/meeting';

const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: string) => toggleLike(meetingId), //api보내기
    onMutate: async (meetingId: string) => {
      await queryClient.cancelQueries({ queryKey: ['meetings'] });

      // 기존 데이터 가져오기
      const prevData = queryClient.getQueryData<InfiniteData<Meeting[]>>(['meetings']);

      // 새로운 좋아요 상태 적용 (낙관적 업데이트)
      queryClient.setQueryData(['meetings'], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: Meeting[]) =>
            page.map((meeting) =>
              meeting.id === meetingId ? { ...meeting, isLiked: !meeting.isLiked } : meeting,
            ),
          ),
        };
      });

      return { prevData };
    },
    onError: (_err, _meetingId, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['meetings'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
};

export default useLikeMutation;
