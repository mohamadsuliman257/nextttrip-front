import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types/category.type";
import { getCategories } from "../api/getCategories.api";

// Hook لجلب التصنيفات من الباك إند
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
