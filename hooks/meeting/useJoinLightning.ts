import { useMutation, useQueryClient } from '@tanstack/react-query';

import { joinLightning, leaveLightning } from '@/api/client/meeting/joinMeeting';
import { connectWebSocket, disconnectWebSocket } from '@/api/socket/websocket';
import chatStore from '@/store/chatStore';

const useJoinLightning = (meetingId: string) => {
  const queryClient = useQueryClient();
  const { openChat, closeChat } = chatStore();

  const joinMutation = useMutation({
    mutationFn: () => joinLightning(meetingId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['lightning', meetingId] });
      const previousData = queryClient.getQueryData(['lightning', meetingId]);
      queryClient.setQueryData(['lightning', meetingId], (old: any) => ({
        ...old,
        isJoined: true,
      }));
      openChat(Number(meetingId));
      connectWebSocket();
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lightning', meetingId] });
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lightning', meetingId], context.previousData);
      }
      closeChat();
      disconnectWebSocket();
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leaveLightning(meetingId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['lightning', meetingId] });
      const previousData = queryClient.getQueryData(['lightning', meetingId]);
      queryClient.setQueryData(['lightning', meetingId], (old: any) => ({
        ...old,
        isJoined: false,
      }));
      closeChat();
      disconnectWebSocket();
      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lightning', meetingId] });
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lightning', meetingId], context.previousData);
      }
      openChat(Number(meetingId));
      connectWebSocket();
    },
  });

  return { joinMutation, leaveMutation };
};

export default useJoinLightning;
