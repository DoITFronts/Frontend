import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import fetchMeetingById from '@/api/client/meeting/fetchMeetingById';
import updateMeetingDescription from '@/api/client/meeting/updateMeetingDescription';
import { MeetingDetail } from '@/types/meeting';

interface UpdateMeetingParams {
  meetingId: string;
  description: string;
}

export function useMeetingDetail(initialMeeting?: MeetingDetail) {
  const params = useParams();
  const meetingId = (params.id as string) || initialMeeting?.id;

  const {
    data = initialMeeting,
    isLoading,
    error,
    refetch,
  } = useQuery<MeetingDetail>({
    queryKey: meetingId ? ['event', meetingId] : [],
    queryFn: () => (meetingId ? fetchMeetingById(meetingId) : Promise.resolve(initialMeeting)),
    initialData: initialMeeting,
    enabled: !!meetingId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    retry: 3,
  });

  if (!meetingId) {
    return { meetingId: null, data: null, isLoading: false, error: null, refetch };
  }

  return { meetingId, data, isLoading, error, refetch };
}

export function useMeetingEditor(meetingDescription: string | undefined) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'default' | 'hover' | 'editing'>('default');
  const [description, setDescription] = useState(meetingDescription ?? '');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  return {
    isEditing,
    setIsEditing,
    status,
    setStatus,
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
