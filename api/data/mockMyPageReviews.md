import mockMeetings from './mockMeetings';

interface Review {
  id: string;
  meetingName: string;
  content: string;
  rating: number;
  category: string;
  location: {
    region_1depth_name: string;
    region_2depth_name: string;
  };
  dateTime: string;
}

const mockMyPageReviews: Review[] = mockMeetings
  .filter((meeting) => meeting.isCompleted)
  .map((meeting) => ({
    id: meeting.id,
    meetingName: meeting.name,
    content: `${meeting.name} 모임은 정말 즐거웠어요!`,
    rating: Math.floor(Math.random() * 5) + 1,
    category: meeting.category,
    location: meeting.location,
    dateTime: meeting.dateTime,
  }));

export default mockMyPageReviews;
