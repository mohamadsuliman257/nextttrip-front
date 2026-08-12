import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReviewPagination } from "../types/review.type";

interface Props {
  pagination: ReviewPagination | undefined;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: Props) {
  if (!pagination || pagination.last_page <= 1) return null;

  const pages = [];
  for (let i = 1; i <= pagination.last_page; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(pagination.current_page - 1)}
        disabled={pagination.current_page <= 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-primary-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            page === pagination.current_page
              ? "bg-primary-600 text-white"
              : "border border-gray-300 hover:bg-primary-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(pagination.current_page + 1)}
        disabled={pagination.current_page >= pagination.last_page}
        className="p-2 rounded-lg border border-gray-300 hover:bg-primary-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
