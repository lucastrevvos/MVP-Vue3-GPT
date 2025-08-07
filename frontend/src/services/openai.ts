import axios from "axios";

import { useAuthStore } from "@/stores/authStore";

export const chatWithGPT = async (message: string) => {
  const auth = useAuthStore();

  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
    {
      message,
      userId: auth.user?.uid || "anon",
    }
  );

  return res.data.response;
};
