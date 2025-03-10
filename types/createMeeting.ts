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
  placeName: string;
  latitude: string;
  longitude: string; // 백에서 스트링으로 받고 있
  image?: File;
}
