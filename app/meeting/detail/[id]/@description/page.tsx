'use client';

import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import EditingIcon from '@/app/meeting/detail/components/EditingIcon';
import {
  DescriptionSkeleton,
  DescriptionError,
} from '@/app/meeting/detail/components/skeleton/DescriptionSkeleton';
import { useMeetingDetail, useMeetingEditor, useUpdateMeeting } from '@/hooks/useMeetingDetail';

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MeetingDescription() {
  const { meetingId, data, isLoading, error, refetch } = useMeetingDetail();
  const {
    isEditing,
    setIsEditing,
    status,
    setStatus,
    title,
    setTitle,
    description,
    setDescription,
    tab,
    setTab,
  } = useMeetingEditor(data?.description);
  const updateMutation = useUpdateMeeting(refetch);

  const handleSave = async () => {
    if (!meetingId) return;
    await updateMutation.mutateAsync({ meetingId, title, description });
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
        <MarkdownEditor value={description} onChange={(value) => setDescription(value || '')} />
      ) : (
        <div className="rounded-md border bg-gray-50 p-4">
          <ReactMarkdown className="flex flex-col gap-1">
            {description || '설명이 없습니다.'}
          </ReactMarkdown>
        </div>
      );
    }

    return (
      <ReactMarkdown className="flex flex-col gap-1">
        {description ?? '설명이 없습니다.'}
      </ReactMarkdown>
    );
  };

  if (isLoading) return <DescriptionSkeleton />;
  if (error) return <DescriptionError onRetry={() => refetch()} />;

  return (
    <div className="min-h-[300px] font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
      <div className="mb-4 flex w-full items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 text-2xl"
          />
        ) : (
          <h2 className="font-dunggeunmo text-2xl font-normal text-black">
            {data?.description?.title ?? '제목 없음'}
          </h2>
        )}
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
  );
}
