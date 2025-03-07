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
