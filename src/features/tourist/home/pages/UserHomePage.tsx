import useAuthStore from "@/features/auth/store/authStore";
import { Compass, Heart, Star,  StarsIcon,  Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserHomePage() {
  const user = useAuthStore((s) => s.user);
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
      title: "حجوزاتي للمرشدين",
      subtitle: "2 مرشد",
      to: "/tourist/my-bookings",
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
      <h1 className="text-2xl font-bold text-primary-500 pt-22 text-center w-full ">مرحباً {user?.name} </h1>      

      <section className="grid grid-cols-5 gap-2 md:px-8 mb-10 mx-[5%] lg:mx-[22%] mt-40 sm:mt-28 md:mt-17 ">
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
                <div className="text-center space-y-2">
                  <Icon className={`w-full ${card.iconColor}`} size={30} />
                    <h3 className={`text-xs md:text-md font-semibold ${card.titleColor}`}>{card.title}</h3>
                    <p className="text-xs md:text-md text-secondary-600">{card.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

    
      <main className="px-8 pb-16"></main>
    </div>
  );
}
