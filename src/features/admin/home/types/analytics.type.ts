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
    new_users_this_month: number;
    new_users_this_week: number;
  };
  bookings: {
    total: number;
    in_period: number;
    by_status: {
      pending: number;
      accepted: number;
      rejected: number;
      completed: number;
      cancelled: number;
    };
    monthly_trend: Array<{
      month: number;
      year: number;
      count: number;
    }>;
    weekly_trend: Array<{
      week: number;
      year: number;
      count: number;
    }>;
  };
  places: {
    total: number;
    by_category: Array<{
      category: string;
      count: number;
    }>;
    by_city: Array<{
      city: string;
      count: number;
    }>;
    average_rating: number;
    total_reviews: number;
  };
  trips: {
    total: number;
    in_period: number;
    monthly_trend: Array<{
      month: number;
      year: number;
      count: number;
    }>;
  };
  revenue: {
    total_revenue: number;
    in_period: number;
    average_booking_value: number;
    monthly_revenue: Array<{
      month: number;
      year: number;
      revenue: number;
    }>;
  };
  suggested_places: {
    total: number;
    by_status: {
      pending: number;
      approved: number;
      rejected: number;
    };
    pending_this_week: number;
  };
}
