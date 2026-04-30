import toast from "react-hot-toast";
import { login } from "../api/login.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();   // ← هنا المكان الصحيح

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.token);

      toast.success("Welcome back!");

      const role = data.data.user.role;

      if (role === "guide") {
        navigate("/guide/dashboard");
      } else {
        navigate("/user/interests");
      }
    }
  });
};

export default useLogin;
