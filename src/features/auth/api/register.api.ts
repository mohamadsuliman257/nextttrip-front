import axios from "@/lib/axios";

export const  registerUser = async (formData: FormData) => {
  const response = await axios.post('/register', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
