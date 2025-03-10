export interface Review {
  id: string;
  writer: string;
  profileImage?: string;
  content: string;
  date: string;
  count: number;
}

export type ReviewList = Review[];

export interface Reviews {
  reviewId: number;
  reviewContent: string;
  rating: number;
  createdAt: string;
  lighteningId: number;
  title: string;
  city: string;
  town: string;
  lighteningImageUrl: string;
  targetAt: string;
  userId: number;
  nickname: string;
  userImageUrl: string;
}
