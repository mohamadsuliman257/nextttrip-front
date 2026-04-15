export default function Hero() {
  return (
    <section className="h-screen"   
    // style={{ backgroundImage: "url(/syria-map.svg), linear-gradient(135deg,#763f9e50 40%, #14b8a650 55% , #ffffff)" , backgroundSize: "100% 100%" , backgroundAttachment: "fixed" }}
    >
      <div className="max-w-5xl mx-auto text-center pt-20">
        {/* العنوان */}
        <h1 className="text-4xl md:text-4xl font-bold leading-tight mb-6  text-primary-500">
          خطّط رحلتك الذكية في سوريا بسهولة
        </h1>

        {/* الوصف */}
        <p className="text-lg font-bold md:text-xl text-secondary-800 max-w-2xl mx-auto mb-10 px-6">
          منصة ذكية تساعدك على اكتشاف الأماكن السياحية، تنظيم رحلتك، 
          وحجز مرشدين محليين بكل سهولة.
        </p>

        {/* زر CTA */}
       <button className="px-10 py-2 text-white rounded-lg shadow-xl btn-animated text-xl " data-aos="fade-up" data-aos-delay="800">
          ابدأ التخطيط
        </button>
      </div>
    </section>
  );
}
