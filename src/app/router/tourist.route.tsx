import MyBookingsPage from "@/features/tourist/bookings/pages/MyBookingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "@/features/tourist/home/pages/HomePage";
import { GuidesPage } from "@/features/tourist/guides/pages/GuidesPage";
import { GuideDetailsPage } from "@/features/tourist/guides/pages/GuideDetailsPage";
import TouristReviewsPage from "@/features/tourist/reviews/pages/TouristReviewsPage";
import TouristNotificationsPage from "@/features/notifications/pages/TouristNotificationsPage";

import TripPlannerPage from "@/features/tourist/trip-planner/pages/TripPlannerPage";

import LeafletMapPage from "@/features/tourist/map/pages/LeafletMapPage";


const userRoutes = [
  {
    path: "/tourist",
    element: <ProtectedRoute role="tourist">
      <HomePage />
    </ProtectedRoute>,
  },
  {
    path: '/tourist/notifications',
    element: <TouristNotificationsPage />
  },
  {
    path: "/tourist",
    element: <ProtectedRoute role="tourist">
      <HomePage />
    </ProtectedRoute>,
  },
  {
    path: "/tourist",
    element: <ProtectedRoute role="tourist">
      <HomePage />
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
    element: <ProtectedRoute role="tourist">
      <TripPlannerPage />
    </ProtectedRoute>,
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
    element: (
      <ProtectedRoute role="tourist">
        <LeafletMapPage />
      </ProtectedRoute>
    ),
  },
];


export default userRoutes;
