import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "../layout/admin/AdminLayout";
import { 
  AdminHomePage, 
  AdminBookingsPage,
  CitiesPage, 
  CategoriesPage, 
  InterestsPage, 
  LanguagesPage, 
  UsersPage, 
  SuggestedPlacesPage,
  DestinationsPage,
  CreateDestinationPage,
  GuideReviewsPage,
  PlaceReviewsPage
} from "@/features/admin";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";

const adminRoutes  = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="admin">
            <AdminHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities",
        element: (
          <ProtectedRoute role="admin">
            <CitiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute role="admin">
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "interests",
        element: (
          <ProtectedRoute role="admin">
            <InterestsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "languages",
        element: (
          <ProtectedRoute role="admin">
            <LanguagesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "interests",
        element: (
          <ProtectedRoute role="admin">
            <InterestsPage />
          </ProtectedRoute>
        ),
      },
{
        path: "users",
        element: (
          <ProtectedRoute role="admin">
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <ProtectedRoute role="admin">
            <AdminBookingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "suggested-places",
        element: (
          <ProtectedRoute role="admin">
            <SuggestedPlacesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "places",
        element: (
          <ProtectedRoute role="admin">
            <DestinationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "places/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateDestinationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "destinations",
        element: (
          <ProtectedRoute role="admin">
            <DestinationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "destinations/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateDestinationPage />
          </ProtectedRoute>
        ),
      },
{
        path: "notifications",
        element: (
          <ProtectedRoute role="admin">
            <NotificationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "guide-reviews",
        element: (
          <ProtectedRoute role="admin">
            <GuideReviewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "place-reviews",
        element: (
          <ProtectedRoute role="admin">
            <PlaceReviewsPage />
          </ProtectedRoute>
        ),
      },
    ],
  }
];
export default adminRoutes;
