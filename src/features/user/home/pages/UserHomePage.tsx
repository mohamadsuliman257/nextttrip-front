import useAuthStore from "@/features/auth/store/authStore";
import { Compass, Heart, Star, LogOut, StarsIcon, X, Menu, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserHomePage() {
  const user = useAuthStore((s) => s.user);
  const [openCards, setOpenCards] = useState(false);
  const userCards = [
    {
      title: "تفضيلاتي ورغباتي",
      subtitle: " الميول",
      to: "/user/preferences",
      icon: Compass,
      borderColor: "border-primary-500",
      iconColor: "text-primary-500",
      titleColor: "text-primary-800",
    },
    {
      title: "رحلاتي لسوريا",
      subtitle: "3 رحلات ",
      to: "/user/trip",
      icon: Heart,
      borderColor: "border-secondary-500",
      iconColor: "text-secondary-600",
      titleColor: "text-secondary-800",
    },
    {
      title: "تقييماتي للأمكنة",
      subtitle: "4 أماكن",
      to: "/user/place",
      icon: Star,
      borderColor: "border-primary-300",
      iconColor: "text-primary-300",
      titleColor: "text-primary-500",
    },
    {
      title: "تقييماتي للمرشدين",
      subtitle: "7 مرشد",
      to: "/user/guide",
      icon: StarsIcon,
      borderColor: "border-secondary-200",
      iconColor: "text-secondary-300",
      titleColor: "text-secondary-500",
    },
    {
      title: "خريطة تفاعلية",
      subtitle: "اماكن قريبة",
      to: "/user/guide",
      icon: Globe,
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-300",
      titleColor: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== Header Section ===== */}
      <h1 className="text-2xl font-bold text-primary-500 pt-28 text-center w-full ">مرحباً {user?.name} </h1>

      <button className="md:hidden bg-primary-600 text-white p-2 rounded-full mx-8 mb-4" onClick={() => setOpenCards(true)}>
        <Menu />
      </button>

      <section className="hidden md:grid grid-cols-5 gap-2 px-8 mb-10 mx-[15%] lg:mx-[22%] mt-25 ">
        {userCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Link key={index} to={card.to}>
              <div
                className={`
                   bg-white shadow-md rounded-xl p-1 border-t-4 border-r-4 text-center hover:translate-y-[-10px] transition skew-y-20 skew-x-5               
            ${card.borderColor}
          `}
              >
                <div className="flex items-center gap-4 ">
                  <Icon className={card.iconColor} size={40} />
                  <div>
                    <h3 className={`text-lg font-semibold ${card.titleColor}`}>{card.title}</h3>
                    <p className="text-secondary-600">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <div
        className={`
    fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity
    ${openCards ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
        onClick={() => setOpenCards(false)}
      >
        <div
          className={`
      absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 transition-transform duration-300
      ${openCards ? "translate-x-0" : "translate-x-full"}
    `}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="mb-6" onClick={() => setOpenCards(false)}>
            <X size={28} className="text-primary-700" />
          </button>

          <div className="flex flex-col gap-4">
            {userCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link key={index} to={card.to} onClick={() => setOpenCards(false)}>
                  <div className={`bg-white shadow-md rounded-xl p-4 border-t-4 ${card.borderColor}`}>
                    <div className="flex items-center gap-3">
                      <Icon className={card.iconColor} size={32} />
                      <div>
                        <h3 className={`text-xs font-semibold ${card.titleColor}`}>{card.title}</h3>
                        <p className="text-secondary-600 text-sm">{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <main className="px-8 pb-16"></main>
    </div>
  );
}
