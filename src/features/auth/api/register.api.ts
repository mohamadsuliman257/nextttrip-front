import axios from "@/lib/axios";

export const  registerUser = async (data :any) => {
  const response = await axios.post('/register', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
