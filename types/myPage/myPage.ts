export interface MyPageState {
  selectedMenuTab: string;
  selectedActivityTab: string;
}

export interface Review {
  reviewId: number;
  reviewContent: string;
  rating: number;
  createdAt: string;
  lighteningId: number;
  category: string;
  title: string;
  city: string;
  town: string;
  lighteningImageUrl: string;
  targetAt: string;
  userId: number;
  nickname: string;
  userImageUrl: string;
}
