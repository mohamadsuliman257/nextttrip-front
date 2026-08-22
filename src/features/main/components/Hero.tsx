import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section className="h-screen flex flex-col justify-center -mt-23 md:-mt-35">
      <div className="max-w-[90%] md:max-w-4xl mx-auto text-center">

        {/* العنوان */}
        <h1 className="heading-primary "
          data-aos="fade-up"
          data-aos-delay="0"
        >
          خطّط رحلتك الذكية في سوريا بسهولة
        </h1>

        {/* الوصف */}
        <p
          className="text-sm md:text-xl font-bold text-secondary-800 max-w-2xl mx-auto mb-9 px-6 w-3/4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          منصة ذكية تساعدك على اكتشاف الأماكن السياحية، تنظيم رحلتك، وحجز مرشدين
          محليين بكل سهولة.
        </p>

        {/* زر CTA */}

        <Link
          className="mx-auto flex w-30 md:w-50 px-2 md:px-10 py-0.5 md:py-2 text-secondary-900 rounded-lg shadow-xl btn-animated  text-base md:text-xl"
          data-aos="zoom-out"
          data-aos-delay="600"
          to="/tourist/trip"
        >
          صمم رحلتك الآن
          <BirdLogo />
        </Link>
      </div>
    </section>
  );
}
