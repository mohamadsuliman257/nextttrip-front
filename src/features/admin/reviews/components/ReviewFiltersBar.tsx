import { Search, ArrowUpDown } from "lucide-react";
import type { ReviewFilters } from "../types/review.type";

interface Props {
  filters: ReviewFilters;
  onChange: (filters: ReviewFilters) => void;
  placeholder: string;
}

export default function ReviewFiltersBar({ filters, onChange, placeholder }: Props) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sort: e.target.value as ReviewFilters["sort"] });
  };

  const handleOrder = () => {
    onChange({ ...filters, order: filters.order === "desc" ? "asc" : "desc" });
  };

  return (
    <div className="bg-white/90 shadow-sm rounded-xl p-4 border border-primary-200 mb-4 flex flex-col md:flex-row gap-3 md:items-center">
      <div className="relative flex-1">
        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search || ""}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.sort || "date"}
          onChange={handleSort}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option value="date">ترتيب حسب التاريخ</option>
          <option value="rating">ترتيب حسب التقييم</option>
        </select>

        <button
          onClick={handleOrder}
          className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition"
        >
          <ArrowUpDown size={18} />
          {
            filters.sort === "date"?
              filters.order === "desc" ? "الأحدث" : "الأقدم" :
              filters.order === "desc" ? "الأعلى" : "الأقل"
          }
        </button>
      </div>
    </div>
  );
}
