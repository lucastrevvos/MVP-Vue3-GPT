<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await auth.logout();
  router.push("/login");
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-3x1 font-bold text-greeen-600">Dashboard (PRivado)</h1>
    <p class="mt-2">Usuario logado: {{ auth.user?.email || "nenhum" }}</p>

    <button
      @click="logout"
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      Sair
    </button>
  </div>
</template>
