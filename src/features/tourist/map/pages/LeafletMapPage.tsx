import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { useMapPlaces } from "../hook/useMapPlaces";
import { useCategories } from "../hook/useCategories";
import { useCities } from "@/features/lookups";
import { MapSidebar } from "../components/MapSidebar";
import { InteractiveMap } from "../components/InteractiveMap";
import type { Destination } from "@/features/admin/destinations/types/destination.type";

export default function LeafletMapPage() {
  // حالة موقع البحث القائم على الموقع (للبحث عن الأماكن القريبة)
  const [searchPosition, setSearchPosition] = useState<[number, number] | null>(null);

  // حالة موقع المستخدم الحالي المستخدم لرسم المسار
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  // حالة تشغيل وضع الأماكن القريبة
  const [nearbyMode, setNearbyMode] = useState(false);

  // حالة نطاق البحث بالكيلومتر
  const [radius, setRadius] = useState(5);

  // حالة تصفية الأماكن حسب النوع
  const [category, setCategory] = useState("all");

  // حالة تصفية الأماكن حسب المدينة
  const [city, setCity] = useState("all");

  // حالة الميزانية
  const [minCost, setMinCost] = useState<number | undefined>(undefined);
  const [maxCost, setMaxCost] = useState<number | undefined>(undefined);

  // حالة البحث النصي متعدد المفاتيح
  const [searchQuery, setSearchQuery] = useState("");

  // حالة المسار المرسوم على الخريطة
  const [route, setRoute] = useState<[number, number][]>([]);

  const searchFilters = useMemo(() => ({
    q: searchQuery.trim() || undefined,
    category_id: category !== "all" ? Number(category) : undefined,
    city_id: city !== "all" ? Number(city) : undefined,
    min_cost: minCost,
    max_cost: maxCost,
    latitude: nearbyMode && searchPosition ? searchPosition[0] : undefined,
    longitude: nearbyMode && searchPosition ? searchPosition[1] : undefined,
    radius: nearbyMode && searchPosition ? radius : undefined,
  }), [searchQuery, category, city, minCost, maxCost, searchPosition, radius, nearbyMode]);

  // جلب بيانات الأماكن من الخادم
  const { data: places = [], isLoading, isError } = useMapPlaces(searchFilters);

  // جلب التصنيفات من الباك إند
  const { data: categories = [] } = useCategories();

  const { data: cities = [] } = useCities();

  // تصفية الأماكن حسب البيانات الواردة من الخادم
  const visiblePlaces = useMemo(
    () => places.filter((place) => Number.isFinite(place.latitude) && Number.isFinite(place.longitude)),
    [places]
  );

  // دالة لتحديد موقع المستخدم الحالي
  const locate = useCallback(() => {
    if (!navigator.geolocation)
      return toast.error("تحديد الموقع غير متاح في هذا المتصفح.");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location: [number, number] = [coords.latitude, coords.longitude];
        setSearchPosition(location);
        setUserPosition(location);
        setRoute([]);
      },
      () => toast.error("يرجى السماح بالوصول إلى موقعك.")
    );
  }, []);

  useEffect(() => {
    setRoute([]);
  }, [searchQuery, category, city, minCost, maxCost, radius, searchPosition, nearbyMode]);

  // دالة لرسم المسار إلى مكان محدد
  const drawRoute = async (place: Destination) => {
    const resolvePosition = () =>
      new Promise<[number, number]>((resolve, reject) => {
        if (userPosition) {
          resolve(userPosition);
          return;
        }

        if (!navigator.geolocation) {
          reject(new Error("الموقع غير متاح"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => resolve([coords.latitude, coords.longitude]),
          () => reject(new Error("إذن الموقع مرفوض"))
        );
      });

    try {
      const resolvedPosition = await resolvePosition();
      if (!userPosition) {
        setUserPosition(resolvedPosition);
      }

      if (!place.latitude || !place.longitude) {
        throw new Error("لا توجد إحداثيات للمكان");
      }

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${resolvedPosition[1]},${resolvedPosition[0]};${place.longitude},${place.latitude}?overview=full&geometries=geojson`
      );

      const data = await response.json() as {
        routes?: { geometry: { coordinates: [number, number][] } }[]
      };

      const coordinates = data.routes?.[0]?.geometry.coordinates;

      if (!coordinates) throw new Error();

      setRoute(coordinates.map(([longitude, latitude]) => [latitude, longitude]));
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : "تعذر حساب المسار المقترح.";
      toast.error(message === "الموقع غير متاح" || message === "إذن الموقع مرفوض"
        ? "يرجى السماح بالوصول إلى موقعك أولاً لعرض المسار."
        : message);
    }
  };

  return (
    <main className="min-h-screen pb-8" dir="rtl">
      <section className="mx-auto md:text-center max-w-7xl px-4 -mt-15 mb-10">
        <h1 className="text-lg md:text-2xl font-bold text-primary-500 px-3">
          استكشف سوريا على الخريطة
        </h1>
        <p className="text-lg my-3 text-secondary-500">
          اكتشف الوجهات القريبة ثم اعرض تفاصيلها وارسم طريقك إليها.
        </p>
        <div className="grid gap-2 lg:grid-cols-[1fr_640px] bg-white/50 p-2 rounded-xl">
          <MapSidebar
            radius={radius}
            nearbyMode={nearbyMode}
            category={category}
            city={city}
            searchQuery={searchQuery}
            minCost={minCost}
            maxCost={maxCost}
            categories={categories}
            cities={cities}
            visiblePlacesCount={visiblePlaces.length}
            onLocate={locate}
            onNearbyModeChange={setNearbyMode}
            onRadiusChange={setRadius}
            onCategoryChange={setCategory}
            onCityChange={setCity}
            onSearchQueryChange={setSearchQuery}
            onMinCostChange={setMinCost}
            onMaxCostChange={setMaxCost}
          />

          <InteractiveMap
            nearbyMode={nearbyMode}
            searchPosition={searchPosition}
            userPosition={userPosition}
            radius={radius}
            route={route}
            places={visiblePlaces}
            isLoading={isLoading}
            isError={isError}
            onDrawRoute={drawRoute}
          />
        </div>
      </section>
    </main >
  );
}