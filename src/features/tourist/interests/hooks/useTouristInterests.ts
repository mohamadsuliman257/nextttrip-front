import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllInterests } from "../api/getAllInterests.api";
import { getTouristInterests } from "../api/getTouristInterests.api";
import { saveTouristInterests } from "../api/saveTouristInterests.api";

export function useTouristInterests() {
  const queryClient = useQueryClient();

  const allInterestsQuery = useQuery({
    queryKey: ["tourist-interests-all"],
    queryFn: getAllInterests,
  });

  const savedInterestsQuery = useQuery({
    queryKey: ["tourist-interests-saved"],
    queryFn: getTouristInterests,
  });

  const saveMutation = useMutation({
    mutationFn: saveTouristInterests,
    onSuccess: (saved) => {
      queryClient.setQueryData(["tourist-interests-saved"], saved);
      toast.success("تم حفظ اهتماماتك بنجاح");
    },
    onError: () => {
      toast.error("فشل حفظ الاهتمامات");
    },
  });

  return {
    interests: allInterestsQuery.data || [],
    savedInterests: savedInterestsQuery.data || [],
    isLoading: allInterestsQuery.isLoading || savedInterestsQuery.isLoading,
    saveInterests: saveMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}
