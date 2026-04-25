import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  Navigation } from "swiper/modules";
import "swiper/swiper.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlider() {
  const slides = [
    {
      title: "قصر  العظم",
      description: "استمتع بأجمل وأعرق المناطق التاريخية والحضارة الانسانية.",
      image: "/images/cover1.jpg",
    },
    {
      title: "الجامع الأموي",
      description: "وجهة مثالية معلم تاريخي وحضارة عظمة الساحرة.",
      image: "/images/cover2.jpg",
    },
    {
      title: "صلاح الدين",
      description: "وجهة مثالية للاسترخاء والطبيعة الساحرة.",
      image: "/images/cover3.jpg",
    },
    {
      title: "الجامع الأموي",
      description: "وجهة مثالية للاسترخاء والطبيعة الساحرة.",
      image: "/images/cover4.jpg",
    },
  ];

  return (
    <div className="relative max-h- w-3/5 lg:w-3/6 mx-auto h-[400px] mt-10 mb-50">
      <h3 className="text-5xl text-primary-700 font-bold text-center mb-10">
        أكثر الأماكن زيارة
      </h3>

      <Swiper
        modules={[Autoplay,  Navigation]}
        autoplay={{ delay: 3500 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
        className="h-full  border-primary-600 border-2 shadow-secondary-100  shadow-2xl"
      >
        {/* أسهم مخصصة */}
        <div
          className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 
        z-20 bg-secondary-500/50 hover:bg-primary-500/60 backdrop-blur-xl 
        p-3 rounded-full text-white cursor-pointer transition"
        >
          <ChevronLeft size={24} />
        </div>

        <div
          className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 
        z-20  bg-secondary-500/50 hover:bg-primary-500/60 backdrop-blur-xl 
        p-3 rounded-full text-white cursor-pointer transition"
        >
          <ChevronRight size={24} />
        </div>
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* الصندوق الجانبي الشفاف */}
              <div
                className="absolute bottom-2 right-2 h-40 w-1/3
                bg-primary-100/70 border border-secondary-600 
                text-secondary-600 text-shadow-2xs text-shadow-primary-900  p-6 rounded-xl max-w-sm"
              >
                <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
                <p className="mb-4 text-xl">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
