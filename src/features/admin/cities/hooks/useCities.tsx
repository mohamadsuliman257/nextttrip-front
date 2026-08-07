import { useGetCities } from "./useGetCities";
import { useCreateCity } from "./useCreateCity";
import { useUpdateCity } from "./useUpdateCity";
import { useDeleteCity } from "./useDeleteCity";

export function useCities() {
  const citiesQuery = useGetCities();
  const createMutation = useCreateCity();
  const updateMutation = useUpdateCity();
  const deleteMutation = useDeleteCity();

  return {
    cities: citiesQuery.data || [],
    isLoading: citiesQuery.isLoading,
    createCity: createMutation.mutate,
    updateCity: updateMutation.mutate,
    deleteCity: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
