export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  distribution: Record<number, number>;
}

export interface ReviewPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ReviewFilters {
  search?: string;
  sort?: "date" | "rating";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

export interface GuideUser {
  id: number;
  name: string;
  email: string;
}

export interface GuideInfo {
  id: number;
  avatar?: string;
  daily_price?: number;
  user?: GuideUser;
}

export interface TouristInfo {
  id: number;
  name: string;
  email: string;
}

export interface TripInfo {
  id: number;
  title?: string;
  start_date?: string;
  end_date?: string;
}
export type BookingStatus = "pending" | "accepted" | "rejected" | "completed" | "cancelled_by_tourist" | "cancelled_by_guide" | "expired";

export interface BookingInfo {
  id: number;
  start_date: string;
  day_count: number;
  status: BookingStatus;
  total_price: string;
  created_at?: string;
  last_note?: string;
  guide?: GuideInfo;
  tourist?: TouristInfo;
  trip?: TripInfo | null;
}

export interface GuideReview {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  booking: BookingInfo;
}

export interface PlaceInfo {
  id: number;
  name: string;
  city?: { id: number; name: string };
  category?: { id: number; name: string };
  average_rating?: number;
  reviews_count?: number;
  image_url?: string | null;
}

export interface PlaceReview {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  place_image?: string | null;
  place?: PlaceInfo;
  user?: TouristInfo;
}

export interface GuideReviewsResponse {
  stats: ReviewStats;
  items: GuideReview[];
  pagination: ReviewPagination;
}

export interface PlaceReviewsResponse {
  stats: ReviewStats;
  items: PlaceReview[];
  pagination: ReviewPagination;
}
