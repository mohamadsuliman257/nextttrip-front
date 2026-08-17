import { useState } from "react";
import { Crosshair } from "lucide-react";
import toast from "react-hot-toast";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const selectedIcon = L.divIcon({
  className: "",
  html: `<span style="display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#763f9e;color:#fff;font-size:18px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><b>📍</b></span>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const SYRIA_CENTER: [number, number] = [34.8021, 38.9968];

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface LocationMapPickerProps {
  latitude?: string;
  longitude?: string;
  onLocationChange: (lat: string, lng: string) => void;
  title: string

}

export default function LocationMapPicker({
  latitude: initialLat,
  longitude: initialLng,
  onLocationChange,
  title="الموقع على الخريطة"
}: LocationMapPickerProps) {
  const [mapLocation, setMapLocation] = useState<[number, number] | null>(
    initialLat && initialLng ? [parseFloat(initialLat), parseFloat(initialLng)] : null
  );

  const [latDisplay, setLatDisplay] = useState(initialLat || "");
  const [lngDisplay, setLngDisplay] = useState(initialLng || "");

  const handleLocationSelect = (lat: number, lng: number) => {
    const latStr = lat.toFixed(6);
    const lngStr = lng.toFixed(6);
    setMapLocation([lat, lng]);
    setLatDisplay(latStr);
    setLngDisplay(lngStr);
    onLocationChange(latStr, lngStr);
  };

  const locateCurrentPosition = () => {
    if (!navigator.geolocation) {
      toast.error("تحديد الموقع غير متاح في هذا المتصفح.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        handleLocationSelect(coords.latitude, coords.longitude);
        toast.success("تم تحديد موقعك الحالي!");
      },
      () => toast.error("يرجى السماح بالوصول إلى موقعك.")
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">        
        <label htmlFor="">
          {title}
        </label>
        <button
          type="button"
          onClick={locateCurrentPosition}
          className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 transition bg-primary-50 px-3 py-1.5 rounded-lg"
        >
          <Crosshair size={14} />
          موقعي الحالي
        </button>
      </div>

      <div className="h-[300px] rounded-xl overflow-hidden border-2 border-gray-200">
        <MapContainer
          center={SYRIA_CENTER}
          zoom={7}
          className="h-full w-full"
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          dragging={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker onLocationSelect={handleLocationSelect} />
          {mapLocation && (
            <Marker position={mapLocation} icon={selectedIcon} />
          )}
        </MapContainer>
      </div>      

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <label className="block font-medium text-gray-500 mb-1">خط العرض</label>
          <input
            value={latDisplay}
            readOnly
            dir="ltr"
            placeholder="الضغط على الخريطة"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600 outline-none"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-500 mb-1">خط الطول</label>
          <input
            value={lngDisplay}
            readOnly
            dir="ltr"
            placeholder="الضغط على الخريطة"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
