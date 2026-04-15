const destinations = [
  { name: "Hawaii", image: "/images/1.jpg" },
  { name: "Paris", image: "/images/2.jpg" },
  { name: "Las Vegas", image: "/images/3.jpg" },
  { name: "Cancun", image: "/images/4.jpg" },
  { name: "Los Cabos", image: "/images/5.jpg" },
  { name: "Dominican Republic", image: "/images/6.jpg" },
  { name: "Jamaica", image: "/images/7.jpg" },
  { name: "Orlando", image: "/images/8.jpg" },
];

export default function MasonryGallery() {
  return (
    <div className="px-5 py-10 w-3/4 mx-auto mb-10 bg-linear-30 from-primary-400 to-secondary-100 rounded-3xl">
      <h3 className="text-5xl text-primary-700 font-bold text-center mb-10">
        أجمل الأماكن
      </h3>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 p-4">
        {destinations.map((item, i) => (
          <div
            key={i}
            className="relative mb-4 overflow-hidden rounded-xl group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover 
              transition-all duration-1000 
              group-hover:scale-125 
              group-hover:brightness-125
              "
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 
            bg-black/20 
            group-hover:bg-black/40 
            transition-all duration-700"
            ></div>

            {/* Text */}
            <h3
              className="absolute bottom-4 left-4 
            text-white text-xl font-bold drop-shadow-lg"
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
