import MyBookingsPage from "@/features/tourist/bookings/pages/MyBookingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "@/features/tourist/home/pages/HomePage";
import { GuidesPage } from "@/features/tourist/guides/pages/GuidesPage";
import { GuideDetailsPage } from "@/features/tourist/guides/pages/GuideDetailsPage";

const userRoutes = [
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
    path: "/tourist/guides",
    element: <GuidesPage />
  },
  {
    path: "/tourist/guides/:guideId",
    element: <GuideDetailsPage />
  },
];


export default userRoutes;
