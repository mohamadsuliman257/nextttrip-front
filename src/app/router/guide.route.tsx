import GuideLayout from "@/app/layout/guide/GuideLayout";
import GuideHomePage from "@/features/guide/home/pages/GuideHomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import GuideProfilePage from "@/features/guide/profile/pages/GuideProfilePage";
import AllBookingsPage from "@/features/guide/bookings/pages/AllBookingsPage";

const guideRoutes = [
  {
    path: "/guide",
    element: <GuideLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="guide">
            <GuideHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: <GuideProfilePage />
      },
      {
        path: 'bookings',
        element: <AllBookingsPage />
      },
      {
        path: 'reviews',
        element: <GuideHomePage />
      },
      {
        path: 'notifications',
        element: <GuideHomePage />
      },
      {
        path: 'suggest-place',
        element: <GuideHomePage />
      },
    ],
  },
];
export default guideRoutes;
