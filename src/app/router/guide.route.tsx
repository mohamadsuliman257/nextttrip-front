import GuideLayout from "@/app/layout/guide/GuideLayout";
import GuideHomePage from "@/features/guide/home/pages/GuideHomePage";
import ProtectedRoute from "./ProtectedRoute";

const guideRoutes  = [
  {
    path: "/guide",
    element: <GuideLayout />,
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute role="guide">
            <GuideHomePage />
          // </ProtectedRoute>
        ),
      },
    ],
  }
];
export default guideRoutes;
