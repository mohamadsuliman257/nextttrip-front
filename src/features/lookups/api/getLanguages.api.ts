import axios from "@/lib/axios";
import type { Language } from "../types/language.type";

export async function getLanguages(): Promise<Language[]> {
  const res = await axios.get("/public/languages");
  return res.data.data;
}
