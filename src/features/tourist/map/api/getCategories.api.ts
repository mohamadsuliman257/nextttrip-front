import axios from "@/lib/axios";
import type { Category } from "../types/category.type";

export async function getCategories(): Promise<Category[]> {
  const res = await axios.get("/public/categories");
  console.log(res);
  return res.data.data;
}
