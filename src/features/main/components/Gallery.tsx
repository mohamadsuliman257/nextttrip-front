import { useTopPlaces } from "../hooks/useTopPlaces";

export default function MasonryGallery() {
  const { data: places, isLoading } = useTopPlaces();

  if (isLoading) {
    return (
      <div className="max-w-[90%] md:max-w-4xl mx-auto pt-10 mt-70 mb-10 bg-linear-30 from-primary-400 to-secondary-100 rounded-3xl">
        <h2 className="heading-primary">أجمل الأماكن</h2>
        <div className="p-4 flex items-center justify-center">
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const destinations = places || [];

  return (
    <div className="max-w-[90%] md:max-w-4xl mx-auto pt-10 mt-70 mb-10 bg-linear-30 from-primary-400 to-secondary-100 rounded-3xl">
      <h2 className="heading-primary">أجمل الأماكن</h2>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 p-4">
        {destinations.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-10">
            <p className="text-gray-500">لا توجد أماكن متاحة</p>
          </div>
        ) : (
          destinations.map((item, i) => (
            <div
              key={item.id}
              className="relative mb-4 overflow-hidden rounded-xl group cursor-pointer"
              data-aos="flip-left"
              data-aos-delay={i * 200}
              data-aos-duration="1000"
            >
              <img
                src={item.image_url || "/images/placeholder.jpg"}
                alt={item.name}
                loading="lazy"
                className="w-full h-auto object-cover
                transition-all duration-1000 group-hover:scale-125 group-hover:brightness-125"
              />

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold drop-shadow-lg">{item.name}</h3>
                {item.city?.name && (
                  <p className="text-white/80 text-sm drop-shadow-md">{item.city.name}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
