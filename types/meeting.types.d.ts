export interface Location {
  region_1depth_name: string;
  region_2depth_name: string;
}

export interface Meeting {
  id: number;
  category: string;
  name: string;
  dateTime: string;
  location: Location;
  participantCount: number;
  capacity: number;
  image: string;
  description: string;
  isLiked: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
}
