<script setup lang="ts">
import { chatWithGPT } from "@/services/openai";
import { ref } from "vue";

const input = ref("");
const loading = ref(false);
const response = ref("");

const send = async () => {
  loading.value = true;
  response.value = await chatWithGPT(input.value);
  loading.value = false;
  input.value = "";
};
</script>

<template>
  <div class="p-8 space-y-4">
    <h1 class="text-3x1 font-bold text-pink-600">Chat</h1>
    <textarea
      v-model="input"
      class="w-full border h-12 p-2"
      placeholder="Sua pergunta"
    ></textarea>
    <button
      @click="send"
      :disabled="loading"
      class="w-full bg-pink-600 text-white py-2 cursor-pointer hover:bg-pink-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ loading ? "Carregando..." : "Enviar" }}
    </button>
    <div v-if="loading" class="text-gray-600 animate-pulse">
      Aguarde... a IA está respondendo
    </div>
    <div v-else class="bg-gray-100 p-4 rounded whitespace-pre-wrap">
      {{ response }}
    </div>
  </div>
</template>
