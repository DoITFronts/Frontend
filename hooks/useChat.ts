import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchChatRooms,
  createChatRoom,
  fetchChatMessages,
  joinChatRoom,
} from '@/api/chat/chatApi';

export const useChatRooms = () =>
  useQuery({
    queryKey: ['chatRooms'],
    queryFn: fetchChatRooms,
  });

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['chatRooms']);
    },
  });
};

export const useChatMessages = (roomId: string) =>
  useQuery({
    queryKey: ['chatMessages', roomId],
    queryFn: () => fetchChatMessages(roomId),
    enabled: !!roomId, // roomId가 있을 때만 실행
  });

export const useJoinChatRoom = () => useMutation(joinChatRoom);

