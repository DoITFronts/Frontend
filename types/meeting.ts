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
