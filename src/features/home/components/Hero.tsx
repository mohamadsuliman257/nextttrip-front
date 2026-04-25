import { motion } from "framer-motion";
const BirdLogo = () => {
  return (
    <div
      style={{        
        transform: "translate(-50px,-30px)",
        position: 'absolute',
        left: 0
      }}
    >
      <motion.img
        src="/icon.png"
        alt="Logo"
        style={{ width: 70 }}
        
        animate={{
          y: [0, -20, 0], // يتحرك للأعلى والأسفل          
          rotate: [0, 5, -5, 0], // ميلان خفيف جداً لإعطاء واقعية
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeIn",
        }}        
      />
    </div>
  );
};
export default function Hero() {
  return (
    <section className="h-screen">
      <div className="max-w-5xl mx-auto text-center pt-20">
        {/* العنوان */}
        <h1
          className="text-4xl md:text-4xl font-bold leading-tight mb-6 text-primary-500"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          خطّط رحلتك الذكية في سوريا بسهولة
        </h1>

        {/* الوصف */}
        <p
          className="text-lg font-bold md:text-xl text-secondary-800 max-w-2xl mx-auto mb-7 px-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          منصة ذكية تساعدك على اكتشاف الأماكن السياحية، تنظيم رحلتك، وحجز مرشدين
          محليين بكل سهولة.
        </p>

        {/* زر CTA */}

        <button
          className="mx-auto flex px-10 py-2 text-secondary-900 rounded-lg shadow-xl btn-animated text-xl"
          data-aos="zoom-out"
          data-aos-delay="600"
        >
          صمم رحلتك الآن
          <BirdLogo />
        </button>
      </div>
    </section>
  );
}
