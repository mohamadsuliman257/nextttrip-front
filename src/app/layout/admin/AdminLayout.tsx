import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";

export default function AdminLayout() {
  return (
    <>
      <div className="flex min-h-screen bg-linear-180  from-secondary-600/30 via-secondary-700/20  to-primary-100">
      {/* <div> */}
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <main className="p-2 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
