<script setup lang="ts">
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
</script>
<template>
  <nav class="flex gap-4 p-4 bg-gray-100">
    <RouterLink to="/" class="text-blue-600">Home</RouterLink>

    <RouterLink v-if="!auth.isAuthenticated" to="/login" class="text-purple-600"
      >Login</RouterLink
    >
    <RouterLink
      v-if="auth.isAuthenticated"
      to="/dashboard"
      class="text-green-600"
      >Dashboard</RouterLink
    >
  </nav>
  <RouterView />
</template>
