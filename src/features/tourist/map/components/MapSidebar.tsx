import { Navigation, Search } from "lucide-react";
import type { Category } from "../types/category.type";
import type { City } from "@/features/lookups/types/city.type";

interface MapSidebarProps {
  radius: number;
  nearbyMode: boolean;
  category: string;
  city: string;
  searchQuery: string;
  minCost?: number;
  maxCost?: number;
  categories: Category[];
  cities: City[];
  visiblePlacesCount: number;
  onLocate: () => void;
  onNearbyModeChange: (value: boolean) => void;
  onRadiusChange: (value: number) => void;
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onMinCostChange: (value: number | undefined) => void;
  onMaxCostChange: (value: number | undefined) => void;
}

// الشريط الجانبي للبحث والتصفية
export function MapSidebar({
  radius,
  category,
  city,
  searchQuery,
  minCost,
  maxCost,
  categories,
  cities,
  visiblePlacesCount,
  onLocate,
  nearbyMode,
  onNearbyModeChange,
  onRadiusChange,
  onCategoryChange,
  onCityChange,
  onSearchQueryChange,
  onMinCostChange,
  onMaxCostChange,
}: MapSidebarProps) {
  return (
    <aside className="rounded-2xl bg-white p-2 shadow-sm">
      <div className="mb-5 flex items-center gap-2 font-bold">
        <Search size={19} />
        البحث القريب
      </div>

      <label className="mb-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
        <span className="flex items-center gap-2">
          <Navigation size={16} />
          اكتشاف الأماكن القريبة
        </span>
        <input
          type="checkbox"
          checked={nearbyMode}
          onChange={(event) => {
            const nextValue = event.target.checked;
            onNearbyModeChange(nextValue);
            if (nextValue) {
              onLocate();
            }
          }}
          className="h-4 w-4 rounded border-slate-300"
        />
      </label>

      <button
        onClick={onLocate}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!nearbyMode}
      >
        <Navigation size={18} />
        تحديد الموقع الحالي
      </button>

      <label className={`mb-2 block text-sm ${!nearbyMode ? "text-slate-400" : "text-slate-700"}`}>
        نصف قطر البحث عن الأماكن القريبة: {radius} كم
      </label>
      <input
        className="mb-5 w-full accent-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
        type="range"
        min="1"
        max="20"
        step="1"
        value={radius}
        disabled={!nearbyMode}
        onChange={(event) => onRadiusChange(Number(event.target.value))}
      />

      <label className="mb-2 block text-sm">
        بحث متعدد المفاتيح
      </label>
      <input
        className="mb-4 w-full rounded-lg border p-2.5 text-right"
        type="search"
        placeholder="ابحث باسم المكان، المدينة، العنوان أو الوصف"
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
      />

      <label className="mb-2 block text-sm">
        اختر المدينة
      </label>
      <select
        className="mb-5 w-full rounded-lg border p-2.5"
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
      >
        <option value="all">كل المدن</option>
        {cities.map((c) => (
          <option key={c.id} value={String(c.id)}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm">
        الميزانية (د.ل)
      </label>
      <div className="grid gap-3 md:grid-cols-2 mb-5">
        <input
          className="w-full rounded-lg border p-2.5 text-right"
          type="number"
          min="0"
          value={minCost ?? ""}
          placeholder="الحد الأدنى"
          onChange={(event) => {
            const value = event.target.value;
            onMinCostChange(value === "" ? undefined : Number(value));
          }}
        />
        <input
          className="w-full rounded-lg border p-2.5 text-right"
          type="number"
          min="0"
          value={maxCost ?? ""}
          placeholder="الحد الأقصى"
          onChange={(event) => {
            const value = event.target.value;
            onMaxCostChange(value === "" ? undefined : Number(value));
          }}
        />
      </div>

      <label className="mb-2 block text-sm">
        نوع المكان
      </label>
      <select
        className="w-full rounded-lg border p-2.5"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">كل الأنواع</option>
        {categories.map((cat) => (
          <option key={cat.id} value={String(cat.id)}>
            {cat.name}
          </option>
        ))}
      </select>

      <p className="mt-5 text-sm text-slate-500">
        {visiblePlacesCount} وجهة مطابقة
      </p>
    </aside>
  );
}
