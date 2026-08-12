import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";

export default function AdminLayout() {
  return (
    <>
      <div className="flex min-h-screen bg-linear-0 from-primary-100/30 via-secondary-100/30 to-primary-100/30">
      {/* <div> */}
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <main className="px-2 py-15 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
