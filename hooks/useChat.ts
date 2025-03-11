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
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
  });
};

export const useChatMessages = (roomId: string) =>
  useQuery({
    queryKey: ['chatMessages', roomId],
    queryFn: () => fetchChatMessages(roomId),
    enabled: !!roomId,
  });

export const useJoinChatRoom = () =>
  useMutation<void, Error, string>({
    mutationFn: joinChatRoom,
  });
