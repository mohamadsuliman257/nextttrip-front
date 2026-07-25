import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/getCities.api";

export function useGetCities() {
  return useQuery({
    queryKey: ["admin-cities"],
    queryFn: getCities,
  });
}
