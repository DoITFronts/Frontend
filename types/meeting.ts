export interface Location {
  region_1depth_name: string;
  region_2depth_name: string;
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
    profileImage: string;
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
