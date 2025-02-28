import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import fetchMeetingById from '@/api/meeting/fetchMeetingById';
import updateMeetingDescription from '@/api/meeting/updateMeetingDescription';
import { MeetingDetail } from '@/types/meeting';

interface UpdateMeetingParams {
  meetingId: string;
  title: string;
  description: string;
}


export function useMeetingDetail(meeting: MeetingDetail) {
  return useQuery({
    queryKey: ['event', meeting?.id],
    queryFn: () => fetchMeetingById(meeting.id),
    initialData: meeting,
    enabled: !!meeting.id,
  });
}

export function useMeetingData() {
  const params = useParams();
  const meetingId = params.id as string;

  const {
    data: meeting,
    isLoading,
    error,
    refetch,
  } = useQuery<MeetingDetail>({
    queryKey: ['event', meetingId],
    queryFn: () => fetchMeetingById(meetingId),
    enabled: !!meetingId,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });

  return { meetingId, meeting, isLoading, error, refetch };
}

export function useMeetingEditor(meeting?: MeetingDetail) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'default' | 'hover' | 'editing'>('default');
  const [title, setTitle] = useState(meeting?.details?.title ?? '');
  const [description, setDescription] = useState(meeting?.details?.description ?? '');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (meeting?.details) {
      setTitle(meeting.details.title);
      setDescription(meeting.details.description);
    }
  }, [meeting]);

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
    onSuccess: async () => {
      await refetch();
    },
  });
}