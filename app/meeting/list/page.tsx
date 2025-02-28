import fetchMeeting from '@/api/meeting/fetchMeeting';

import MeetingList from './components/MeetingList';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params?.category ?? '';
  const location1 = params?.location_1 ?? '';
  const location2 = params?.location_2 ?? '';
  const date = params?.date ? new Date(params.date) : null;

  const initialMeetings = await fetchMeeting({
    category,
    location1,
    location2,
    date,
    page: 1,
    per_page: 10,
  });

  return <MeetingList initialMeetings={initialMeetings} />;
}
