<script setup lang="ts">
import {ref} from "vue";
import {api} from "@/api";
import {useStore} from "vuex";

const store = useStore();
const description = ref("");
const amount = ref(0);
const type = ref("");

async function createTransaction() {
  await api.post("/api/transactions", {
    description: description.value,
    amount: amount.value,
    type: type.value
  }, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN"),
    }
  }).then(() => {
    store.dispatch("fetchHistory");
    store.dispatch("fetchUser");
    store.dispatch("fetchAnalyze");
  })
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
            <input type="radio" value="income" id="type" v-model="type">
            <label for="type">Доход</label>
          </div>
          <div class="flex gap-2">
            <input type="radio" value="expense" id="type" v-model="type">
            <label for="type">Расход</label>
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