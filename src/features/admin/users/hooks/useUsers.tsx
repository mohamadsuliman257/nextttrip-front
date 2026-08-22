import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { getUsers } from "../api/getUsers.api";
import { updateUserStatus } from "../api/updateUserStatus.api";
import { makeAdmin } from "../api/makeAdmin.api";
import type { UserFilters, UpdateUserStatusData } from "../types/user.type";

const resolveErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? fallback;
  }
  return fallback;
};

export function useUsers(filters?: UserFilters) {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users", filters],
    queryFn: () => getUsers(filters),
    // إبقاء النتائج الحالية ظاهرة أثناء جلب نتائج البحث الجديدة
    placeholderData: (previous) => previous,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserStatusData }) =>
      updateUserStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("تم تحديث حالة المستخدم بنجاح");
    },
    onError: (error) => {
      toast.error(resolveErrorMessage(error, "فشل تحديث حالة المستخدم"));
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: (id: number) => makeAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("تم تحويل المستخدم إلى مدير نظام بنجاح");
    },
    onError: (error) => {
      toast.error(resolveErrorMessage(error, "فشل تحويل المستخدم إلى مدير نظام"));
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    updateUserStatus: updateStatusMutation.mutate,
    makeAdmin: makeAdminMutation.mutate,
    isUpdating: updateStatusMutation.isPending || makeAdminMutation.isPending,
  };
}
