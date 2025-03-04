export interface Location {
  region_1depth_name: string;
  region_2depth_name: string;
}

export interface Host {
  id: string;
  name: string;
  profileImage: string;
}

export interface Meeting {
  id: string;
  category: string;
  name: string;
  dateTime: string;
  date: string;
  location: Location;
  participantCount: number;
  capacity: number;
  image: string;
  description: string;
  isLiked: boolean;
  isJoined?: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
  host: Host;
}
