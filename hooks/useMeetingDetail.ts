'use client';

import { useQuery } from '@tanstack/react-query';

import fetchMeetingById from '@/api/meeting/fetchMeetingById';

const useMeetingDetail = (id: string) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchMeetingById(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

export default useMeetingDetail;
