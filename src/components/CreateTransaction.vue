<script setup lang="ts">
import {ref} from "vue";
import {api} from "@/api";
import {useStore} from "@/stores";
import {useToast} from "vue-toastification";

const store = useStore();
const toast = useToast();

const description = ref("");
const amount = ref(0);
const category = ref("");
const type = ref("");

async function createTransaction() {
  if (!description.value || !amount.value || !type.value) {
    toast.error("Заполните все поля!");
  } else {
    await api.post("/api/transactions", {
      description: description.value,
      amount: amount.value,
      category: category.value,
      type: type.value
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      }
    }).then(() => {
      store.fetchHistory();
      store.fetchAnalyze();
    }).catch(() => toast.error("Произошла ошибка"));
  }
}
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Новая транзакция</h3>
    </div>
    <div class="p-6">
      <form class="space-y-4">
        <div>
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="description"
          >
            Описание
          </label>
          <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              placeholder="Введите описание"
              v-model="description"
          />
        </div>
        <div>
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="category"
          >
            Категория
          </label>
          <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="category"
              placeholder="Введите категорию"
              v-model="category"
          />
        </div>
        <div>
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="amount"
          >
            Сумма
          </label>
          <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="amount"
              placeholder="Введите сумму"
              type="number"
              v-model="amount"
          />
        </div>
        <div>
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="type"
          >
            Тип
          </label>
          <div class="flex gap-2">
            <button class="border rounded-lg p-2" @click.prevent="type ='income'" :class="{ 'bg-green-500': type === 'income', 'text-white': type === 'income' }">Доход</button>
            <button class="border rounded-lg p-2" @click.prevent="type = 'expense'" :class="{ 'bg-red-500': type === 'expense', 'text-white': type === 'expense' }">Расход</button>
          </div>
        </div>
        <button
            class="inline-flex items-center justify-center rounded-md hover:bg-green-700 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-green-600 text-white"
            @click.prevent="createTransaction"
        >
          Создать
        </button>
      </form>
    </div>
  </div>
</template>