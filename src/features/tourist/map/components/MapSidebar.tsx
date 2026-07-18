import { Navigation, Search } from "lucide-react";
import type { Category } from "../types/category.type";

interface MapSidebarProps {
  radius: number;
  category: string;
  categories: Category[];
  visiblePlacesCount: number;
  onLocate: () => void;
  onRadiusChange: (value: number) => void;
  onCategoryChange: (value: string) => void;
}

// الشريط الجانبي للبحث والتصفية
export function MapSidebar({
  radius,
  category,
  categories,
  visiblePlacesCount,
  onLocate,
  onRadiusChange,
  onCategoryChange,
}: MapSidebarProps) {
  return (
    <aside className="rounded-2xl bg-white p-5 shadow-sm mt-20">
      <div className="mb-5 flex items-center gap-2 font-bold">
        <Search size={19} />
        البحث القريب
      </div>

      <button
        onClick={onLocate}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-white"
      >
        <Navigation size={18} />
        استكشاف الأماكن القريبة
      </button>

      <label className="mb-2 block text-sm">
        نطاق البحث: {radius} كم
      </label>
      <input
        className="mb-5 w-full accent-primary-600"
        type="range"
        min="1"
        max="5"
        value={radius}
        onChange={(event) => onRadiusChange(Number(event.target.value))}
      />

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
