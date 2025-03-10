export interface Review {
  id: string;
  score: number;
  content: string;
  nickname: string;
  userId: string;
  userImageUrl?: string;
  createdAt: string;
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
