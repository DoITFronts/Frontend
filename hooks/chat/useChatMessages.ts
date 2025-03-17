import { useQuery } from "@tanstack/react-query";

import { fetchChatMessages } from "@/api/client/chat/chatApi";

const useChatMessages = (roomId: number) =>
  useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: () => fetchChatMessages(roomId),
    enabled: !!roomId,
  });

export default useChatMessages;
