import { fetchMeetingList } from '@/api/meeting/fetchMeeting';

import MeetingList from './components/MeetingList';

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

  const initialMeetings = await fetchMeetingList({
    category,
    city,
    town,
    targetAt,
    order,
  });

  return <MeetingList initialMeetings={initialMeetings} />;
}
