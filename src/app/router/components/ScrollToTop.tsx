import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * يعيد التمرير إلى أعلى الصفحة عند تغيير المسار.
 * يُضاف إلى التخطيطات حتى لا يبقى المستخدم في موضع التمرير القديم عند الانتقال لصفحة جديدة.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
