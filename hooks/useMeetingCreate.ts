import createMeeting from "@/api/meeting/createMeeting";
import { CreateMeetingParams } from "@/types/meeting/meeting";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateMeeting() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CreateMeetingParams>({
    mutationFn: createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}
