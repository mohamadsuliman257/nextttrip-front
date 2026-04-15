const steps: string[] = [
  "اختر وجهتك",
  "احصل على خطة تلقائية",
  "استكشف الخريطة",
  "احجز مرشد سياحي",
];

const HowItWorks = () => {
  return (
    <section className="px-8 py-16 my-50 shadow-sm border-8 shadow-secondary-500 w-3/5 mx-auto
    bg-secondary-50/30"
    >
      <h3 className="text-5xl text-primary-700 font-bold text-center mb-20">كيف تعمل المنصة؟</h3>

      <div className="flex flex-col md:flex-row justify-center gap-20">
        {steps.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold text-secondary-600 mb-2">{i + 1}</div>
            <p className="text-gray-700 text-lg">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
