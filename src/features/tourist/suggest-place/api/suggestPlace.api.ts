import api from "@/lib/axios";
import type { SuggestPlaceInput, SuggestPlaceResponse } from "../types/suggestPlace.type";


export function buildSuggestPlaceFormData(data: SuggestPlaceInput): FormData {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("city_id", data.city_id);
  if (data.description) formData.append("description", data.description);
  if (data.latitude) formData.append("latitude", data.latitude);
  if (data.longitude) formData.append("longitude", data.longitude);

  data.images.forEach((image) => {
    formData.append("images[]", image);
  });

  return formData;
}

export async function createSuggestPlace(formData: FormData): Promise<SuggestPlaceResponse> {
  const response = await api.post("/suggested-places", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}
