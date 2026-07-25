export interface AnalyticsData {
  overview: {
    total_users: number;
    total_guides: number;
    total_tourists: number;
    total_places: number;
    total_bookings: number;
    total_trips: number;
    pending_suggestions: number;
  };
  users: {
    new_users_this_month: number;
    new_users_this_week: number;
    by_role: {
      admin: number;
      guide: number;
      tourist: number;
    };
    by_status: {
      active: number;
      blocked: number;
      unavailable: number;
    };    
  };  
  places: {
    by_category: Array<{
      category: string;
      count: number;
    }>;
    by_city: Array<{
      city: string;
      count: number;
    }>;
    total: number;
    average_rating: number;
    reviews_count: number;
  };
   
  bookings:  any;  
  trips: any;

  revenue: {
    total_revenue: number;
    last_year_revenue: number;
    average_booking_value: number;   
  };  
}
