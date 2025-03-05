import { MeetingCategory } from "@/types/meeting";

export interface Review {
  id: string;
  writer: string;
  profileImage?: string;
  content: string;
  date: string;
  count: number;
}

export interface ReviewSummary {
  id: string;
  category: MeetingCategory;
  summary: string;
  imageUrl: string;
  targetAt: string;
  city: string;
  town: string;
  participantCount: number;
  review: Review;
}
