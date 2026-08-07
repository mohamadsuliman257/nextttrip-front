import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity } from "../api/deleteCity.api";
import toast from "react-hot-toast";

export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم حذف المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف المدينة");
    },
  });
}
