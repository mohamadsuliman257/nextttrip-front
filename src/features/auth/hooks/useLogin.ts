import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { login } from "../api/login.api";
import  useAuthStore  from "@/features/auth/store/authStore";
import type { LoginFormData } from "../schemas/loginSchema";

interface LoginErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

// استخراج رسالة الخطأ من استجابة الخادم (رسالة الحساب المحجوب مثلاً)
const resolveLoginError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data as LoginErrorResponse | undefined;
    const fieldError = data?.errors
      ? Object.values(data.errors).flat()[0]
      : undefined;

    return fieldError || data?.message || "بيانات التوثق غير صحيحة";
  }

  return "بيانات التوثق غير صحيحة";
};

const useLogin = () => {
  const setLogin = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: (data :LoginFormData) => login(data),


    onSuccess: ( res ) => {
      const { user, token } = res.data;

      setLogin(user, token);
    },

    onError: (error) => {
      toast.error(resolveLoginError(error));
    },
  });
};

export default useLogin;
