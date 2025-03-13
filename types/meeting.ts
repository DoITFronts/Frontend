export enum MeetingCategory {
  GOURMET = 'GOURMET',
  CAFE = 'CAFE',
  BOARD_GAME = 'BOARD_GAME',
  ALCOHOL = 'ALCOHOL',
}

export const categoryMap: Record<string, MeetingCategory> = {
  맛집: MeetingCategory.GOURMET,
  카페: MeetingCategory.CAFE,
  보드게임: MeetingCategory.BOARD_GAME,
  술: MeetingCategory.ALCOHOL,
};

export interface Participant {
  lighteningId: number;
  userId: number;
  name: string;
  image?: string;
  isHost: boolean;
  email: string;
  description: string;
}

export interface Host {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  userBio: string;
}

export interface Meeting {
  id: string;
  category: MeetingCategory;
  title: string;
  summary: string;
  imageUrl: string;
  targetAt: string;
  city: string;
  town: string;
  participantCount: number;
  capacity: number;
  minCapacity: number;
  isLiked: boolean;
  isJoined: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
  participants: Participant[];
}

export interface MeetingDetail extends Meeting {
  placeName: string;
  latitude: string;
  longitude: string;
  address: string;
  host: Host;
  description: string;
}

export interface CreateMeetingParams {
  title: string;
  summary: string;
  address: string;
  city: string;
  town: string;
  placeName: string;
  latitude: string;
  longitude: string;
  category: MeetingCategory;
  targetAt: string;
  endAt: string;
  capacity: number;
  minCapacity: number;
  image?: File;
}

export interface FetchMeetingListParams {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  page?: number;
  size?: number;
  order?: string;
}
