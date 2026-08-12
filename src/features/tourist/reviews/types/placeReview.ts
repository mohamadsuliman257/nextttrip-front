type City = {
  name: string;
};
type Place = {
  name: string;
  image: string;
  city: City;
};

export type TouristPlaceReview = {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  place: Place;
};

