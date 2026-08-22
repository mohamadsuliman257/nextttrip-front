import type { Destination } from "@/features/admin/destinations/types/destination.type";

export interface PlaceReview {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string | null;
  user?: { id: number; name: string } | null;
}

export type PlaceDetails = Destination & {
  reviews?: PlaceReview[];
};
