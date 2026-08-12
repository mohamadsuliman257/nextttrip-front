import toast from "react-hot-toast";
import useAuthStore from "@/features/auth/store/authStore";

export function useTouristGuard() {
  return () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      toast.error("يرجى تسجيل الدخول لإضافة الأماكن إلى رحلاتك");
      return false;
    }
    if (user.role !== "tourist") {
      toast.error("إضافة الأماكن إلى الرحلات متاح للسائح فقط");
      return false;
    }
    return true;
  };
}
