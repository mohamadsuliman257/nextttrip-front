import { create } from "zustand";
import { persist } from "zustand/middleware";

// شكل بيانات المستخدم
export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "guide" | "admin";
};

// شكل الـ store
type AuthState = {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
};

 const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // المفتاح داخل localStorage
    }
  )
);
export default useAuthStore;    