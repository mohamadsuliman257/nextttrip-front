import { useEffect } from "react";
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Destination } from "@/features/admin/destinations/types/destination.type";
import { PlacePopup } from "./PlacePopup";
import { Overlay } from "./Overlay";

// إحداثيات سوريا الافتراضية
const SYRIA: [number, number] = [34.8021, 38.9968];

// دالة لحساب المسافة بالكيلومتر بين نقطتين
const distanceKm = (from: [number, number], to: [number, number]) => 
  L.latLng(from).distanceTo(L.latLng(to)) / 1000;

// دالة لإنشاء أيقونة مخصصة لكل مكان حسب نوعه
const placeIcon = (place: Destination) => 
  L.divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:32px;height:32px;border-radius:50% 50% 50% 0;background:#763f9e;color:#fff;transform:rotate(-45deg);font-size:16px"><b style="transform:rotate(45deg)">${place.category_id === 1 ? "🍽" : place.category_id === 2 ? "🏨" : "📍"}</b></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

// مكون للتحكم في أحداث الخريطة
function MapEvents() {
  const map = useMapEvents({
    load: () => {
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
    },
  });
  return null;
}

// مكون للتحكم في العرض الحالي على الخريطة
function ViewController({
  nearbyMode,
  point,
}: {
  nearbyMode: boolean;
  point: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!nearbyMode) {
      map.setView(SYRIA, 7);
      return;
    }

    if (point) {
      map.flyTo(point, 12);
    }
  }, [map, nearbyMode, point]);

  return null;
}

function FitBounds({ bounds }: { bounds: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!bounds || bounds.length === 0) return;
    const latLngBounds = L.latLngBounds(bounds.map((coord) => L.latLng(coord)));
    map.fitBounds(latLngBounds, { padding: [40, 40] });
  }, [map, bounds]);

  return null;
}

interface InteractiveMapProps {
  nearbyMode: boolean;
  searchPosition: [number, number] | null;
  userPosition: [number, number] | null;
  radius: number;
  route: [number, number][];
  places: Destination[];
  isLoading: boolean;
  isError: boolean;
  onDrawRoute: (place: Destination) => void;
}

// حاوية الخريطة التفاعلية
export function InteractiveMap({
  nearbyMode,
  searchPosition,
  userPosition,
  radius,
  route,
  places,
  isLoading,
  isError,
  onDrawRoute,
}: InteractiveMapProps) {
  const shouldShowUserPosition =
    userPosition &&
    (!searchPosition || userPosition[0] !== searchPosition[0] || userPosition[1] !== searchPosition[1]);

  return (
    <div className="relative h-137.5 overflow-hidden rounded-2xl border shadow-sm">
      {isLoading && <Overlay text="جاري تحميل الوجهات..." />}
      {isError && <Overlay text="تعذر تحميل الوجهات. تحقق من VITE_MAP_PLACES_ENDPOINT." />}
      
      <MapContainer center={SYRIA} zoom={7} className="h-full w-full" scrollWheelZoom={false} doubleClickZoom={false} touchZoom={false}>
        <MapEvents />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {!route.length && (
          <ViewController
            nearbyMode={nearbyMode}
            point={userPosition ?? searchPosition}
          />
        )}
        {route.length > 0 && <FitBounds bounds={route} />}

        {/* دائرة نطاق البحث حول موقع البحث */}
        {searchPosition && (
          <>
            <Circle
              center={searchPosition}
              radius={radius * 1000}
              pathOptions={{ color: "#763f9e", fillOpacity: 0.08 }}
            />
            <Marker position={searchPosition}>
              <Popup>نقطة البحث</Popup>
            </Marker>
          </>
        )}

        {shouldShowUserPosition && (
          <Marker position={userPosition!}>
            <Popup>موقعك الحالي</Popup>
          </Marker>
        )}

        {/* رسم المسار المحدد */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{ color: "#763f9e", weight: 5 }}
          />
        )}

        {/* عرض الأماكن المرئية على الخريطة */}
        {places.map((place) => {
          const currentPosition = userPosition ?? searchPosition;

          return (
            <Marker
              key={place.id}
              position={[place.latitude!, place.longitude!]}
              icon={placeIcon(place)}
            >
              <Popup>
                <PlacePopup
                  place={place}
                  userPosition={currentPosition}
                  distance={currentPosition ? distanceKm(currentPosition, [place.latitude!, place.longitude!]) : 0}
                  onDrawRoute={onDrawRoute}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
