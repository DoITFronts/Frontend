import ReviewList from '../components/ReviewList';

import { fetchReviewMeetingList } from '@/api/meeting/fetchMeeting';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params?.category ?? '';
  const city = params?.location_1 ?? '';
  const town = params?.location_2 ?? '';
  const targetAt = params?.targetAt ? new Date(params.targetAt) : null;
  const order = params?.order ?? '';

  const initialReviews = await fetchReviewMeetingList({
    category,
    city,
    town,
    targetAt,
    order,
  });

  return <ReviewList initialReviews={initialReviews} />;
}
