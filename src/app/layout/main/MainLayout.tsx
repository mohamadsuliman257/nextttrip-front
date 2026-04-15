// layout.tsx
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import FooterSkeleton from "./components/FooterSkeleton";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // الحركة تظهر مرة واحدة فقط
    });
  }, []);
  const loading = false;
  return (      
    <div className="min-h-screen bg-gray-50" dir="rtl"
      style={{ backgroundImage: "url(/syria-map.svg), radial-gradient(#ffffff50 , #763f9e50  , #14b8a650  )" , backgroundSize: "100% 100%" , backgroundAttachment: "fixed" }}
    // style={{ backgroundImage: "url(/syria-map.svg), linear-gradient(135deg,#763f9e50 40%, #14b8a650 55% , #ffffff)" , backgroundSize: "100% 100%" , backgroundAttachment: "fixed" }}

      >
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      {loading ? <FooterSkeleton /> : <Footer />}
    </div>
  );
};

export default MainLayout;
