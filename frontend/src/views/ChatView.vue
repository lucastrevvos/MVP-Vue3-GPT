<script setup lang="ts">
import { chatWithGPT, getChatHistory } from "@/services/openai";
import { onMounted, ref } from "vue";

const input = ref("");
const loading = ref(false);
const response = ref("");
const history = ref<{ question: string; response: string }[]>([]);

const send = async () => {
  loading.value = true;
  response.value = await chatWithGPT(input.value);
  await loadHistory();
  loading.value = false;
  input.value = "";
};

const loadHistory = async () => {
  history.value = await getChatHistory();
};

onMounted(() => {
  loadHistory();
});
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

  <hr class="my-6" />

  <div class="p-8 space-y-4">
    <h2 class="text-x1 font-semibold text-gray-700 mb-4">Histórico recente</h2>
    <ul class="space-y-4">
      <li
        v-for="(item, index) in history"
        :key="index"
        class="bg-gray-100 p-4 rounded"
      >
        <p>
          <strong class="text-blue-700"> Pergunta: </strong>{{ item.question }}
        </p>
        <br />
        <p>
          <strong class="text-blue-700">Resposta: </strong>{{ item.response }}
        </p>
      </li>
    </ul>
  </div>
</template>
