import { deleteLightning } from "@/api/client/meeting/joinMeeting";
import { MEETING_DELETE_SUCCESS } from "@/lib/constants/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useDeleteLightning() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLightning,
    onSuccess: () => {
      // 삭제 성공 시 관련된 모든 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast.success(MEETING_DELETE_SUCCESS, { autoClose: 900 });
    },
    onError: (error) => {
      console.error("번개 삭제 중 오류 발생:", error);
    },
  });
}
