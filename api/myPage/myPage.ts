interface FetchMyPageMeetingsParams {
  type: string; // '나의 번개' | '내가 만든 번개'
  category?: string; // '술' | '카페' | '보드 게임' | '맛집'
}

export const fetchMyPageMeetings = async ({ type, category }: FetchMyPageMeetingsParams) => {
  const queryParams = new URLSearchParams({
    type,
    ...(category && { category }),
  }).toString();

  const response = await fetch(`/api/mypage/meetings?${queryParams}`);

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  return response.json();
};

export const fetchMyPageReviews = async () => {
  const response = await fetch('/api/mypage/reviews');

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  return response.json();
};
