export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  town: string;
}

export type MeetingDetail = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: Location;
  datetime: string;
  summary: string;
  isLiked: boolean;
  maxParticipants: number;
  currentParticipants: number;
  host: {
    id: string;
    name: string;
    profileImage?: string;
    email: string;
    userBio: string;
  };
  participants: {
    id: string;
    name: string;
    profileImage: string;
  }[];
  details: {
    title: string;
    description: string;
  };
  reviews: {
    id: string;
    writer: string;
    profileImage: string;
    content: string;
    date: string;
    count: number;
  }[];
};

export interface CreateMeetingParams {
  title: string;
  summary: string;
  address: string;
  city: string;
  town: string;

  category: 'ALCOHOL' | 'CAFE' | 'BOARD_GAME' | 'GOURMET';
  targetAt: string;
  endAt: string;
  capacity: number;
  minCapacity: number;
  image?: File;
}
