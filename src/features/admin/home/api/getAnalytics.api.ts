import axios from "@/lib/axios";
import type { AnalyticsData } from "../types/analytics.type";

export async function getAnalytics(): Promise<AnalyticsData> {
  const res = await axios.get("/admin/analytics");
  console.log(res.data.data);
  return res.data.data;
}
