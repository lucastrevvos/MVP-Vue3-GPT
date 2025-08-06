<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await authStore.loginWithEmail(email.value, password.value);
  } catch (error: any) {
    alert("Erro ao fazer login: " + error.message);
  }
};

const register = async () => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    authStore.user = res.user;

    router.push("/dashboard");
  } catch (error: any) {
    alert("Erro ao criar conta: " + error.message);
  }
};

const loginGoogle = async () => {
  await authStore.loginWithGoogle();
};
</script>
<template>
  <div class="p-8 space-y-4">
    <h1 class="text-3x1 font-bold text-purple-600">Login / Registro</h1>
    <input v-model="email" placeholder="Email" class="border p-2 w-full" />
    <input
      v-model="password"
      placeholder="Senha"
      type="password"
      class="border p-2 w-full"
    />
    <button
      @click="login"
      class="w-full px-4 py-2 bg-purple-600 text-white rounded"
    >
      Entrar com email
    </button>
    <button
      @click="register"
      class="bg-green-600 text-white px-4 py-2 rounded w-full"
    >
      Criar conta
    </button>
    <button
      @click="loginGoogle"
      class="bg-red-600 text-white px-4 py-2 rounded w-full"
    >
      Entrar com Google
    </button>
  </div>
</template>
