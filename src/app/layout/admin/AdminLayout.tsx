import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import FooterSkeleton from "../shared/components/FooterSkeleton";
import Footer from "../shared/components/Footer";

export default function AdminLayout() {
  const loading = false;
  return (
    <>
      <div className="flex min-h-screen  bg-radial  from-secondary-600/30 to-secondary-700/20">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="px-6 py-1">
            <Outlet />
          </main>
        </div>
      </div>
      {loading ? <FooterSkeleton /> : <Footer />}
    </>
  );
}
