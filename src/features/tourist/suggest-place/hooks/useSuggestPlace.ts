import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSuggestPlace } from "../api/suggestPlace.api";
import toast from "react-hot-toast";

export function useSuggestPlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createSuggestPlace(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggested-places"] });
      toast.success("تم إرسال الاقتراح بنجاح! بانتظار مراجعة الإدارة.");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "فشل إرسال الاقتراح. يرجى المحاولة مرة أخرى.";
      toast.error(message);
    },
  });
}
