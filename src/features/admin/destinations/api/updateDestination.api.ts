import axios from "@/lib/axios";

const toFormValue = (value: unknown): string | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "number" && Number.isNaN(value)) return undefined;
  return String(value);
};

export async function updateDestination(id: number, data: any): Promise<void> {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("city_id", data.city_id.toString());
  formData.append("category_id", data.category_id.toString());
  formData.append("name", data.name);

  const optionalFields: Array<[string, unknown]> = [
    ["description", data.description],
    ["phone", data.phone],
    ["address", data.address],
    ["cost", data.cost],
    ["expected_duration_minutes", data.expected_duration_minutes],
    ["activity_level", data.activity_level],
    ["is_outdoor", data.is_outdoor],
    ["latitude", data.latitude],
    ["longitude", data.longitude],
  ];

  optionalFields.forEach(([key, value]) => {
    const v = toFormValue(value);
    if (v !== undefined) formData.append(key, v);
  });

  if (data.best_seasons && data.best_seasons.length > 0) {
    data.best_seasons.forEach((season: string) => formData.append("best_seasons[]", season));
  }
  if (data.recommended_times && data.recommended_times.length > 0) {
    data.recommended_times.forEach((time: string) => formData.append("recommended_times[]", time));
  }
  if (data.opening_hours) {
    const hoursString = typeof data.opening_hours === "string"
      ? data.opening_hours
      : Array.isArray(data.opening_hours)
        ? data.opening_hours.map((h: unknown) => (typeof h === "string" ? h : JSON.stringify(h))).join(", ")
        : Object.values(data.opening_hours).map((h: unknown) => (typeof h === "string" ? h : JSON.stringify(h))).join(", ");
    if (hoursString.trim()) formData.append("opening_hours[default]", hoursString.trim());
  }

  const images = data.images ? Array.from(data.images as ArrayLike<File>) : [];
  if (images.length > 0) {
    images.forEach((image) => {
      formData.append("images[]", image);
    });
  }

  if (data.interests && data.interests.length > 0) {
    data.interests.forEach((interestId: number) => {
      formData.append("interests[]", interestId.toString());
    });
  }

  if (data.existing_images && data.existing_images.length > 0) {
    data.existing_images.forEach((image: unknown) => {
      const url = typeof image === "string" ? image : (image as { image_url?: string }).image_url;
      if (url) formData.append("existing_images[]", url);
    });
  }

  if (data.images_to_delete && data.images_to_delete.length > 0) {
    data.images_to_delete.forEach((imageId: number) => {
      formData.append("images_to_delete[]", imageId.toString());
    });
  }

  await axios.post(`/admin/places/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
