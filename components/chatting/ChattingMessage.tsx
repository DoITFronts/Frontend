import BaseProfile from "@/components/utils/BaseProfile";

interface ChatMessageProps {
  userNickname: string;
  content: string;
  userId: number;
  userImage?: string;
  createdAt: string;
}

export default function ChatMessage({
  userNickname,
  content,
  userId,
  userImage,
  createdAt,
}: ChatMessageProps) {
  return (
    <div className="flex items-start gap-2 rounded-md bg-gray-200 p-3 dark:bg-gray-700">
      {userImage ? (
        <img
          src={userImage}
          alt="User Profile"
          className="size-6 rounded-full object-cover"
        />
      ) : (
        <BaseProfile id={userId} size={24} />
      )}
      <div className="flex flex-col">
        <strong className="text-sm font-semibold text-black dark:text-white">
          {userNickname}
        </strong>
        <div>
          <p className="text-sm text-gray-800 dark:text-gray-300">{content}</p>
          <div>{createdAt}</div>
        </div>
      </div>
    </div>
  );
}
