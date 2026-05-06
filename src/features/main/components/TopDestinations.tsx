import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
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
    <div className="max-w-[90%] md:max-w-4xl mx-auto relative  lg:w-3/6  h-[400px] mt-10 mb-50">
      <h2 className="heading-primary">أكثر الأماكن زيارة</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
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
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              {/* الصندوق الجانبي الشفاف */}
              <div
                className="
                    absolute bottom-3 right-3 bg-primary-100/70 border border-secondary-600 
                    text-secondary-600 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6  
                    w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-auto text-sm sm:text-base md:text-lg " >
                <h2 className="text-2xl font-bold mb-3">{slide.title}</h2>
                <p className="mb-4 text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
