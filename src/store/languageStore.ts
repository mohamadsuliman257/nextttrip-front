import { create } from "zustand";

type Language = "en" | "ar";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: "en",
  setLanguage: (lang) => set({ currentLanguage: lang }),
}));
