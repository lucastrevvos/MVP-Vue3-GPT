<script setup lang="ts">
import { chatWithGPT, getChatHistory } from "@/services/openai";
import { onMounted, ref, nextTick } from "vue";

const input = ref("");
const loading = ref(false);
const response = ref("");
const history = ref<
  { question: string; response: string; createdAt?: string }[]
>([]);
const errorMsg = ref("");

const loadHistory = async () => {
  try {
    const list = await getChatHistory();
    history.value = list;
  } catch (error) {
    errorMsg.value = "Não foi possível carregar o histórico";
  }
};

const send = async () => {
  if (!input.value.trim() || loading.value) return;

  errorMsg.value = "";
  loading.value = true;

  if (!Array.isArray(history.value)) history.value = [];

  const pending = {
    question: input.value,
    response: "IA está respondendo...",
    createdAt: new Date().toISOString(),
  };

  history.value.unshift(pending);

  const currentInput = input.value;
  input.value = "";

  try {
    const text = await chatWithGPT(currentInput);
    response.value = text;

    const idx = history.value.findIndex(
      (h) => h.question === pending.question && h.response === pending.response
    );

    if (idx !== -1) history.value[idx].response = text;
  } catch (error) {
    errorMsg.value = "Falha ao falar com a IA. Tente novamente";

    const idx = history.value.findIndex(
      (h) => h.question === pending.question && h.response === pending.response
    );

    if (idx !== -1) history.value[idx].response = "Erro ao obter resposta";
  } finally {
    loading.value = false;
    await nextTick();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    send();
  }
};

onMounted(loadHistory);
</script>

<template>
  <div class="p-8 space-y-4 max-w-2x1 mx-auto">
    <h1 class="text-3x1 font-bold text-pink-600">Chat</h1>
    <textarea
      v-model="input"
      @keydown="onKey"
      class="w-full border rounded h-24 p-3"
      placeholder="Sua pergunta (Crtl+Enter para enviar)"
    ></textarea>
    <button
      @click="send"
      :disabled="loading || !input.trim()"
      class="w-full bg-pink-600 text-white py-2 cursor-pointer hover:bg-pink-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ loading ? "Carregando..." : "Enviar" }}
    </button>

    <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>

    <div v-else class="bg-gray-100 p-4 rounded whitespace-pre-wrap">
      <strong>Última resposta: </strong>
      <div class="mt-2">{{ response || "-" }}</div>
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
