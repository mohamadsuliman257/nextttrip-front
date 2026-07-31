import ProtectedRoute from "./components/ProtectedRoute";

import MyBookingsPage from "@/features/tourist/bookings/pages/MyBookingsPage";
import HomePage from "@/features/tourist/home/pages/HomePage";
import  GuidesPage  from "@/features/tourist/guides/pages/GuidesPage";
import  GuideDetailsPage  from "@/features/tourist/guides/pages/GuideDetailsPage";
import TouristReviewsPage from "@/features/tourist/reviews/pages/TouristReviewsPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";

import TripPlannerPage from "@/features/tourist/trip-planner/pages/TripPlannerPage";

import LeafletMapPage from "@/features/tourist/map/pages/LeafletMapPage";
import SuggestPlacePage from "@/features/tourist/suggest-place/pages/SuggestPlacePage";


const touristRoutes = [
  {
    path: "/tourist",
    element: <ProtectedRoute role="tourist">
      <HomePage />
    </ProtectedRoute>,
  },
  {
    path: '/tourist/notifications',
    element: <ProtectedRoute role="tourist">
      <NotificationsPage />
    </ProtectedRoute>,
  },
  {
    path: "/tourist/my-bookings",
    element: <ProtectedRoute role="tourist">
      <MyBookingsPage />
    </ProtectedRoute>,
  },
  {
    path: "/tourist/reviews",
    element: <ProtectedRoute role="tourist">
      <TouristReviewsPage />
    </ProtectedRoute>,
  },
  {
    path: "/tourist/trip",
    element: <TripPlannerPage />
  },
  {
    path: "/tourist/guides",
    element: <GuidesPage />
  },
  {
    path: "/tourist/guides/:guideId",
    element: <GuideDetailsPage />
  },
  {
    path: "/tourist/map",
    element: <LeafletMapPage />
  },
  {
    path: "/tourist/suggest-place",
    element: <ProtectedRoute role="tourist">
      <SuggestPlacePage />
    </ProtectedRoute>,
  },
];

export default touristRoutes;
