import { useQuery } from "@tanstack/react-query";
import { getInterests } from "../api/getInterests.api";

export function useInterests() {
  return useQuery({
    queryKey: ["interests"],
    queryFn: getInterests,
    staleTime: 1000 * 60 * 60, // ساعة
  });
}
