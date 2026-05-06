import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../api/register.api";
import useAuthStore from "@/features/auth/store/authStore";

// شكل البيانات القادمة من API
type RegisterResponse = {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: "user" | "guide" | "admin";
    };
    token: string;
  };
};

export default function useRegister(setError: any) {
  const { login: setLogin } = useAuthStore();
  // const setLogin = useAuthStore((state) => state.login);

  return useMutation<RegisterResponse, any, FormData>({
    mutationFn: (formData: FormData) => registerUser(formData),

    onSuccess: (res) => {
      toast.success("تم إنشاء الحساب بنجاح");

      const { user, token } = res.data;

      // تخزين الجلسة في Zustand
      setLogin(user, token);

      toast.success("Welcome!");     
    },

    onError: (error) => {
      const backendErrors = error.response?.data?.errors as Record<
        string,
        string[]
      >;

      if (backendErrors) {
        Object.entries(backendErrors).forEach(([field, messages]) => {
          setError(field as any, {
            type: "server",
            message: messages[0],
          });
        });
      }
    },
  });
}
