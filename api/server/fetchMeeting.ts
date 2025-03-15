import fetchData from '@/api/middleware/request';
import { FetchMeetingListParams } from '@/types/meeting';

export const fetchMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/lightenings', params);

export const fetchLikeMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/lightenings/like', params);

export const fetchReviewMeetingList = async (params: FetchMeetingListParams) =>
  fetchData('/api/v1/reviews/all', params);
