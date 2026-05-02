import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import FooterSkeleton from "../shared/components/FooterSkeleton";
import Footer from "../shared/components/Footer";

export default function GuideLayout() {
  const loading = false;
  return (
    <>
      <div className="flex min-h-screen  bg-radial  from-secondary-50 to-primary-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 pt-0">
            <Outlet />
          </main>
        </div>
      </div>
      {loading ? <FooterSkeleton /> : <Footer />}
    </>
  );
}
