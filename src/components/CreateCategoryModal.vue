<script setup lang="ts">
import {ref} from "vue";
import {api} from "@/api";
import {useStore} from "@/stores";

const emits = defineEmits(['closeModal']);

const store = useStore();
const name = ref("");

async function createCategory() {
  await api.post("/api/categories", {
    name: name.value
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        }
      }).then(() => {
    emits("closeModal");
    store.fetchHistory();
    store.fetchAnalyze();
    store.fetchCategories();
  })
}
</script>

<template>
  <div @click="$emit('closeModal')" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
  <div @click.stop class="rounded-lg border bg-card bg-white text-card-foreground shadow-sm w-full max-w-lg mx-5" data-v0-t="card">
    <div class="flex flex-col p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Создать категорию</h3>
    </div>
    <div class="px-6 space-y-4">
      <div class="space-y-2">
        <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="name"
        >
          Название
        </label>
        <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="name"
            placeholder="Введите название"
            v-model="name"
        />
      </div>
    </div>
    <div class="flex justify-end p-6 text-white gap-2">
      <button @click="$emit('closeModal')" class="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Закрыть
      </button>
      <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      @click="createCategory">
        Сохранить
      </button>
    </div>
  </div>
  </div>
</template>