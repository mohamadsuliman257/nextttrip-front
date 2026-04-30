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
    <div
      className="min-h-screen bg-gray-50    
                bg-[url('/syria-map.svg'),radial-gradient(#ffffff50,#763f9e20,#14b8a620)]
                bg-size-[100%_100%]   bg-fixed " dir="rtl" >
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      {loading ? <FooterSkeleton /> : <Footer />}
    </div>
  );
};

export default MainLayout;
