export interface Location {
  region_1depth_name: string;
  region_2depth_name: string;
}

export interface Participants {
  userId: number;
  name: string;
  profileImage?: string;
  isHost: boolean;
}

export interface Meeting {
  id: number;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  targetAt: string;
  date: string;
  city: string;
  town: string;
  participantCount: number;
  capacity: number;
  description: string;
  isLiked: boolean;
  isJoined?: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
  participants: Participants[];
}
