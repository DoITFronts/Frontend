'use client';

import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import EditingIcon from '@/app/meeting/detail/components/EditingIcon';
import {
  DescriptionSkeleton,
  DescriptionError,
} from '@/app/meeting/detail/components/skeleton/DescriptionSkeleton';
import { useMeetingDetail, useMeetingEditor, useUpdateMeeting } from '@/hooks/meeting/useMeetingDetail';

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
function CustomParagraph(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="whitespace-pre-wrap" />;
}

export default function MeetingDescription() {
  const { meetingId, data, isLoading, error, refetch } = useMeetingDetail();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('sub') : null;
  const { isEditing, setIsEditing, status, setStatus, description, setDescription, tab, setTab } =
    useMeetingEditor(data?.description);
  const updateMutation = useUpdateMeeting(refetch);
  const host = data?.participants?.find((participant) => participant.isHost);
  const isHost = Number(userId) === host?.userId;

  const handleSave = async () => {
    if (!meetingId) return;
    await updateMutation.mutateAsync({ meetingId, description });
    setIsEditing(false);
    setStatus('default');
  };

  const handleEditToggle = () => {
    if (isEditing) handleSave();
    setIsEditing((prev) => !prev);
  };

  const renderContent = () => {
    if (isEditing) {
      return tab === 'edit' ? (
        <MarkdownEditor
          value={description}
          // TODO 새로고침 했을 떄 값왜 날라가는지
          onChange={(value) => setDescription(value || description)}
        />
      ) : (
        <div className="rounded-md border bg-gray-50 p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{ p: CustomParagraph }}
            className="flex flex-col gap-1"
          >
            {description || '설명을 추가해주세요!.'}
          </ReactMarkdown>
        </div>
      );
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ p: CustomParagraph }}
        className="flex flex-col gap-1"
      >
        {data?.description ?? '설명을 추가해주세요!.'}
      </ReactMarkdown>
    );
  };

  if (isLoading) return <DescriptionSkeleton />;
  if (error) return <DescriptionError onRetry={() => refetch()} />;
  if (!data?.description && !isHost) return null;

  return (
    <div className="flex min-h-[300px] flex-col justify-between font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
      <div>
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="font-dunggeunmo text-2xl font-normal text-black">
            번개에 대해 자세히 알아보세요!
          </h2>
          {isHost && (
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={() => setStatus('hover')}
              onMouseLeave={() => setStatus(isEditing ? 'editing' : 'default')}
              onClick={handleEditToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEditToggle();
                }
              }}
              className="cursor-pointer"
            >
              <EditingIcon status={isEditing ? 'editing' : status} />
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex border-b border-gray-300">
            {['edit', 'preview'].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`px-4 py-2 ${tab === mode ? 'border-b-2 border-black' : 'text-gray-600'}`}
                onClick={() => setTab(mode as 'edit' | 'preview')}
              >
                {mode === 'edit' ? '편집' : '미리보기'}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4">{renderContent()}</div>
      </div>
      <div className="my-8 h-px border-b border-gray-300 opacity-50" />
    </div>
  );
}
