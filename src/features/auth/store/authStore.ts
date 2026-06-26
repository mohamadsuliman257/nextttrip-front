import { create } from "zustand";
import { persist } from "zustand/middleware";

// شكل بيانات المستخدم
export type User = {
  id: number;
  name: string;
  email: string;
  role: "tourist" | "guide" | "admin";
};

// شكل الـ store
type AuthState = {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: (callback: () => void) => void;
};

 const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),

      logout: (callback) => {
        set({ user: null, token: null });
        if (callback) callback(); // ← هنا السحر
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;    