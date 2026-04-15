import {
  Mail,
  Phone,
  MapPin,
  Globe,  
} from "lucide-react";

const Footer = () => {
  const icons = [
    Mail,
    Phone,
    MapPin,
    Globe,    
  ];
  return (
    <footer
      className="bg-white border-t-4 border-primary-light pt-20 pb-10 px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LOGO + ABOUT */}
        <div>
          <div className="mb-4">
            {/*  الشعار */}
            <img
              src="/logo.png"
              alt="NextTrip Syria Logo"
              className="w-40 h-auto"
            />
          </div>

          <p className="text-gray-600 leading-relaxed">
            منصة NextTrip Syria تساعدك على اكتشاف الوجهات السياحية، التخطيط
            الذكي للرحلات، وحجز المرشدين المحليين بسهولة.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-primary-700 mb-4">
            روابط مهمة
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-primary cursor-pointer transition">
              من نحن
            </li>
            <li className="hover:text-primary cursor-pointer transition">
              الوجهات
            </li>
            <li className="hover:text-primary cursor-pointer transition">
              المرشدون
            </li>
            <li className="hover:text-primary cursor-pointer transition">
              خطط الرحلات
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold text-primary-700 mb-4">
            تواصل معنا
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>البريد: support@nexttrip.sy</li>
            <li>الهاتف: +963 999 999 999</li>
            <li>العنوان: دمشق – سوريا</li>
          </ul>

          <div className="flex gap-4 mt-4 justify-start">
            {icons.map((Icon, index) => (
              <div
                key={index}
                className="w-9 h-9 text-secondary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-light/20 transition"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © 2026 NextTrip Syria — جميع الحقوق محفوظة
      </div>
    </footer>
  );
};

export default Footer;
