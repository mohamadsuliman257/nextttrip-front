// وقت النهاية = وقت البداية + المدة بالدقائق
export function getEndTime(startTime: string | null | undefined, durationMinutes: number): string {
  if (!startTime) return "--:--";
  const [hours = 0, minutes = 0] = startTime.slice(0, 5).split(":").map(Number);
  const total = hours * 60 + minutes + (durationMinutes || 0);
  const endHours = Math.floor(total / 60) % 24;
  const endMinutes = total % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}
