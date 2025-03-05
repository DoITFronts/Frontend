export interface MeetingDetail {
  id: string;
  title: string;
  category: 'ALCOHOL' | 'CAFE' | 'BOARD_GAME' | 'GOURMET';
  imageUrl: string;
  location: Location;
  datetime: string;
  summary: string;
  isLiked: boolean;
  isJoined: boolean;
  maxParticipants: number;
  currentParticipants: number;
  isConfirmed: boolean;
  isCompleted: boolean;
  host: Host;
  participants: Participant[];
}

export interface Location {
  latitude?: number;
  longitude?: number;
  address: string;
  city: string;
  town: string;
}

export interface Host {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Participant {
  id: string;
  name: string;
  profileImage?: string;
}