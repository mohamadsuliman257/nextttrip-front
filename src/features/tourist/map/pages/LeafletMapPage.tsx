import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { useMapPlaces } from "../hook/useMapPlaces";
import { useCategories } from "../hook/useCategories";
import { MapSidebar } from "../components/MapSidebar";
import { InteractiveMap } from "../components/InteractiveMap";
import type { Destination } from "../types/destination.type";

export default function LeafletMapPage() {
  // حالة الموقع الحالي للمستخدم
  const [position, setPosition] = useState<[number, number] | null>(null);

  // حالة نطاق البحث بالكيلومتر
  const [radius, setRadius] = useState(5);

  // حالة تصفية الأماكن حسب النوع
  const [category, setCategory] = useState("all");

  // حالة المسار المرسوم على الخريطة
  const [route, setRoute] = useState<[number, number][]>([]);

  // جلب بيانات الأماكن من الخادم
  const { data: places = [], isLoading, isError } = useMapPlaces();

  // جلب التصنيفات من الباك إند
  const { data: categories = [] } = useCategories();

  // تصفية الأماكن حسب الموقع والتصنيف ونطاق البحث
  const visiblePlaces = useMemo(
    () =>
      places.filter((place) =>
        Number.isFinite(place.latitude) &&
        Number.isFinite(place.longitude) &&
        (category === "all" || String(place.category_id) === category)
      ),
    [places, category]
  );

  // دالة لتحديد موقع المستخدم الحالي
  const locate = useCallback(() => {
    if (!navigator.geolocation)
      return toast.error("تحديد الموقع غير متاح في هذا المتصفح.");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setPosition([coords.latitude, coords.longitude]),
      () => toast.error("يرجى السماح بالوصول إلى موقعك.")
    );
  }, []);

  // دالة لرسم المسار إلى مكان محدد
  const drawRoute = async (place: Destination) => {
    if (!position)
      return toast.error("حدد موقعك أولاً لعرض المسار.");

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${position[1]},${position[0]};${place.longitude},${place.latitude}?overview=full&geometries=geojson`
      );

      const data = await response.json() as {
        routes?: { geometry: { coordinates: [number, number][] } }[]
      };

      const coordinates = data.routes?.[0]?.geometry.coordinates;

      if (!coordinates) throw new Error();

      setRoute(coordinates.map(([longitude, latitude]) => [latitude, longitude]));
    } catch {
      toast.error("تعذر حساب المسار المقترح.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-8" dir="rtl">
      <section className="mx-auto md:text-center max-w-7xl px-4">
        <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
          <MapSidebar
            radius={radius}
            category={category}
            categories={categories}
            visiblePlacesCount={visiblePlaces.length}
            onLocate={locate}
            onRadiusChange={setRadius}
            onCategoryChange={setCategory}
          />
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-primary-500 mt-5  px-3">
              استكشف سوريا على الخريطة
            </h1>
            <p className="text-lg my-3 text-secondary-500">
              اكتشف الوجهات القريبة ثم اعرض تفاصيلها وارسم طريقك إليها.
            </p>
            <InteractiveMap
              position={position}
              radius={radius}
              route={route}
              places={visiblePlaces}
              isLoading={isLoading}
              isError={isError}
              onDrawRoute={drawRoute}
            />
          </div>
        </div>
      </section>
    </main >
  );
}
