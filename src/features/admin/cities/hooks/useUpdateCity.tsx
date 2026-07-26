import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCity } from "../api/updateCity.api";
import toast from "react-hot-toast";

export function useUpdateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateCity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم تحديث المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث المدينة");
    },
  });
}
