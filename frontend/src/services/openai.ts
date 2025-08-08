import axios from "axios";

import { useAuthStore } from "@/stores/authStore";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export const getChatHistory = async () => {
  const auth = useAuthStore();

  const { data } = await api.get(
    `/api/chat/history/${auth.user?.uid || "anon"}`,
    {
      params: { page: 1, limit: 20 },
    }
  );

  const arr = Array.isArray(data) ? data : data.history ?? data.items ?? [];
  return Array.isArray(arr) ? arr : [];
};

export const chatWithGPT = async (message: string) => {
  const auth = useAuthStore();

  const { data } = await api.post(`/api/chat`, {
    message,
    userId: auth.user?.uid || "anon",
  });

  return data.response;
};
