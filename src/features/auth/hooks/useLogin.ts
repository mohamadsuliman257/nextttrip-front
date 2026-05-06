import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../api/login.api";
import  useAuthStore  from "@/features/auth/store/authStore";

// شكل البيانات القادمة من API
type LoginResponse = {
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

const useLogin = () => {
  const setLogin = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, Error>({
    mutationFn: login,

    onSuccess: (res) => {
      const { user, token } = res.data;

      setLogin(user, token); 
    },

    onError: () => {
      toast.error("Invalid credentials");
    },
  });
};

export default useLogin;
