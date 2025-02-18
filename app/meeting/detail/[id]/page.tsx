import fetchEventById from '@/api/meeting/fetchEventById';
import fetchParticipants from '@/api/meeting/fetchParticipants';
import EventDetailClient from '@/app/meeting/detail/components/EventDetailClient';

type EventData = {
  id: string;
  title: string;
  location: string;
  datetime: string;
  description: string;
  isLiked: boolean;
};

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event: EventData = await fetchEventById(id);
  const participants = await fetchParticipants(id);

  if (!event) return <div>이 모임은 존재하지 않습니다.</div>;

  return <EventDetailClient event={event} participants={participants} />;
}
