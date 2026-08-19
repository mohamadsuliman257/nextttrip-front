import { useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { useNearbyRecommendations } from "../hooks/useNearbyRecommendations";
import type { NearbyRecommendation } from "../api/getNearbyRecommendations.api";

export default function NearbyRecommendations() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [useManual, setUseManual] = useState(false);
  const [radius, setRadius] = useState(10);

  const { data: recommendations, isLoading, error, refetch } = useNearbyRecommendations(
    {
      latitude: latitude || 0,
      longitude: longitude || 0,
      radius,
    },
    latitude !== null && longitude !== null
  );

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setUseManual(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("تعذر الحصول على موقعك الحالي. يرجى إدخال الإحداثيات يدوياً.");
          setUseManual(true);
        }
      );
    } else {
      alert("المتصفح لا يدعم تحديد الموقع الجغرافي");
      setUseManual(true);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  const handleSearch = () => {
    if (latitude !== null && longitude !== null) {
      refetch();
    }
  };

  return (
    <div className="max-w-[90%] md:max-w-4xl mx-auto mt-10 mb-20">
      <h2 className="heading-primary">استكشف الأماكن القريبة باستخدام AI</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {!useManual ? (
            <button
              onClick={getCurrentLocation}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Navigation size={20} />
              <span>استخدام موقعي الحالي</span>
            </button>
          ) : (
            <button
              onClick={() => setUseManual(false)}
              className="flex items-center gap-2 bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition"
            >
              <Navigation size={20} />
              <span>استخدام GPS</span>
            </button>
          )}

          <button
            onClick={() => setUseManual(true)}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <MapPin size={20} />
            <span>إدخال يدوي</span>
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">نصف القطر (كم)</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              min={1}
              max={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {latitude !== null && longitude !== null && (
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
              <span>{isLoading ? "جاري البحث..." : "بحث"}</span>
            </button>
          )}
        </div>

        {useManual && (
          <form onSubmit={handleManualSubmit} className="mt-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">خط العرض</label>
              <input
                type="number"
                step="any"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="مثال: 33.5138"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">خط الطول</label>
              <input
                type="number"
                step="any"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="مثال: 36.2765"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition self-end"
            >
              تحديد الموقع
            </button>
          </form>
        )}

        {latitude !== null && longitude !== null && !useManual && (
          <div className="mt-4 p-3 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-700">
              <strong>موقعك الحالي:</strong> {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            حدث خطأ في جلب التوصيات. يرجى المحاولة مرة أخرى.
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-primary-700 mb-4">الأماكن المقترحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {recommendations && recommendations.length === 0 && !isLoading && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">لم يتم العثور على أماكن قريبة في هذا النطاق</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: NearbyRecommendation }) {
  const imageUrl = place.image || place.images?.[0]?.image_url || "/placeholder.jpg";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
        {place.distance && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs">
            {place.distance.toFixed(1)} كم
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-800 mb-2">{place.name}</h4>
        {place.city && (
          <p className="text-sm text-gray-600 mb-2">{place.city.name}</p>
        )}
        {place.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{place.description}</p>
        )}
        {place.average_rating && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{place.average_rating.toFixed(1)}</span>
            {place.reviews_count && (
              <span className="text-xs text-gray-400">({place.reviews_count} مراجعة)</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
