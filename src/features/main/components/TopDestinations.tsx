import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCities } from "../hooks/useCities";

export default function HeroSlider() {
  const { data: cities, isLoading } = useCities();

  if (isLoading) {
    return (
      <div className="max-w-[90%] md:max-w-4xl mx-auto relative lg:w-3/6 h-[400px] mt-10 mb-50">
        <h2 className="heading-primary">أكثر الأماكن زيارة</h2>
        <div className="h-full flex items-center justify-center border-primary-600 border-2 shadow-secondary-100 shadow-2xl">
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const slides = cities || [];

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
        loop={slides.length > 1}
        {...{ preloadImages: false, lazyPreloadPrevNext: 1 }}
        className="h-full border-primary-600 border-2 shadow-secondary-100 shadow-2xl group relative"
      >
        {/* أزرار التنقل */}
        <div
          className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 
                      z-20 bg-secondary-500/50 hover:bg-primary-500/60 backdrop-blur-xl 
                      p-3 rounded-full text-white cursor-pointer transition opacity-0 group-hover:opacity-80"
        >
          <ChevronLeft size={24} />
        </div>

        <div
          className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 
                      z-20 bg-secondary-500/50 hover:bg-primary-500/60 backdrop-blur-xl 
                      p-3 rounded-full text-white cursor-pointer transition opacity-0 group-hover:opacity-80"
        >
          <ChevronRight size={24} />
        </div>

        {slides.length === 0 ? (
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center">
              <p className="text-gray-500">لا توجد مدن متاحة</p>
            </div>
          </SwiperSlide>
        ) : (
          slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image || ""}
                  className="swiper-lazy w-full h-full object-cover"
                  alt={slide.name}
                />
                <div className="swiper-lazy-preloader"></div>

                {/* الصندوق الجانبي */}
                <div
                  className="absolute bottom-3 right-3 bg-primary-100/70 border border-secondary-600 
                            text-secondary-600 backdrop-blur-md rounded-xl p-4 opacity-0 group-hover:opacity-100"
                >
                  <h2 className="text-2xl font-bold mb-3">{slide.name}</h2>
                  <p className="mb-4 text-lg">{slide.description || "استمتع بهذه الوجهة السياحية الرائعة"}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
