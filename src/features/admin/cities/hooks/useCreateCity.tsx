import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCity } from "../api/createCity.api";
import toast from "react-hot-toast";

export function useCreateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم إضافة المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة المدينة");
    },
  });
}
