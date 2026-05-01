import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../api/register.api";
import { useNavigate } from "react-router-dom";

export default function useRegister(setError :any) {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => registerUser(formData),

    onSuccess: (data) => {
      toast.success("تم إنشاء الحساب بنجاح");
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.token);

      toast.success("Welcome back!");
      const role = data.user.role;

      if (role === "guide") {
        navigate("/guide/dashboard");
      } else {
        navigate("/user/interests");
      }
    },
    onError: (error: any) => {
    const backendErrors = error.response?.data?.errors as Record<string, string[]>;

      if (backendErrors) {
        Object.entries(backendErrors).forEach(([field, messages ]) => {
          setError(field as any, {
            type: "server",
            message: messages[0],
          });
        });
      }
    },
  });
}
