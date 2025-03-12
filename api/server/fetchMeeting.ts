import fetchData from '@/api/server/request';
import { FetchMeetingListParams } from '@/types/meeting';

export const fetchMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/lightenings?', params);

export const fetchLikeMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/lightenings/like?', params);

export const fetchReviewMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/lightenings/reviews/all?', params);

// export const fetchReviewMeetingDetail = async (params: FetchMeetingListParams) =>
//   fetchData(`/api/v1/lightenings/${meetingId}/reviews`,params);