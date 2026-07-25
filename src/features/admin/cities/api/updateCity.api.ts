import axios from "@/lib/axios";

export async function updateCity(id: number, data: any): Promise<void> {
  const formData = new FormData();
  
  // خداع السيرفر ليعمل الـ multipart/form-data مع الـ PUT بنجاح
  formData.append("_method", "PUT");
  formData.append("name", data.name);
  
  if (data.description) {
    formData.append("description", data.description);
  }
  
  // فحص صارم لالتقاط الصورة وإضافتها للـ FormData
  if (data.image) {
    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else if (data.image instanceof FileList && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    // ملاحظة: إذا كانت الصورة عبارة عن رابط نصي قديم (String) قادم من قاعدة البيانات للتعديل، يتم تجاهلها وتظل الصورة القديمة كما هي في السيرفر
  }
  
  await axios.post(`/admin/cities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
