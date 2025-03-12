import createMeeting from '@/api/meeting/createMeeting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
}
