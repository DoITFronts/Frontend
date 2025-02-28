import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import fetchMeetingById from '@/api/meeting/fetchMeetingById';
import updateMeetingDescription from '@/api/meeting/updateMeetingDescription';
import { MeetingDetail } from '@/types/meeting';

interface UpdateMeetingParams {
  meetingId: string;
  title: string;
  description: string;
}

export function useMeetingDetail(initialMeeting?: MeetingDetail) {
  const params = useParams();
  const meetingId = (params.id as string) || initialMeeting?.id;

  const { data, isLoading, error, refetch } = useQuery<MeetingDetail>({
    queryKey: ['event', meetingId],
    queryFn: () => fetchMeetingById(meetingId),
    initialData: initialMeeting,
    enabled: !!meetingId,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });

  return { meetingId, data, isLoading, error, refetch };
}

export function useMeetingEditor(meeting?: MeetingDetail) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'default' | 'hover' | 'editing'>('default');
  const [title, setTitle] = useState(meeting?.details?.title ?? '');
  const [description, setDescription] = useState(meeting?.details?.description ?? '');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  return {
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
  };
}

export function useUpdateMeeting(refetch: () => void) {
  return useMutation({
    mutationFn: (updateData: UpdateMeetingParams) => updateMeetingDescription(updateData),
    onSuccess: () => {
      refetch();
    },
  });
}
