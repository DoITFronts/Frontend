export enum MeetingCategory {
  GOURMET = "GOURMET",
  CAFE = "CAFE",
  BOARD_GAME = "BOARD_GAME",
  ALCOHOL = "ALCOHOL",
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
  profileImage?: string;
  isHost: boolean;
}

export interface Host {
  id: string;
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
  isLiked: boolean;
  isJoined: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
  participants: Participant[];
}

export interface MeetingDetail extends Meeting {
  location: Location;
  host: Host;
  description: string;
}

export interface CreateMeetingParams {
  title: string;
  summary: string;
  address: string;
  city: string;
  town: string;
  category: MeetingCategory;
  targetAt: string;
  endAt: string;
  capacity: number;
  minCapacity: number;
  image?: File;
}