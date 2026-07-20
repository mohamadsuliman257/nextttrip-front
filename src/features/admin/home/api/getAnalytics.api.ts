import axios from "@/lib/axios";
import type { AnalyticsData } from "../types/analytics.type";

export async function getAnalytics(period: 'week' | 'month' | 'year' = 'month'): Promise<AnalyticsData> {
  const res = await axios.get("/admin/analytics", { params: { period } });
  return res.data.data;
}
