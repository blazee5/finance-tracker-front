<script setup lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";
import {api} from "@/api";

const store = useStore();
const transactions = computed(() => store.getters.getHistory);

async function deleteTransaction(id: string) {
  await api.delete(`/api/transactions/${id}`,
      {
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
    <h3 class="text-2xl font-semibold leading-none tracking-tight">История</h3>
  </div>
  <div class="p-6">
    <div class="w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&amp;_tr]:border-b">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Дата
          </th>
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Описание
          </th>
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Сумма
          </th>
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Действие
          </th>
        </tr>
        </thead>
        <tbody class="[&amp;_tr:last-child]:border-0">
        <tr v-if="transactions" v-for="transaction in transactions" :key="transaction?.id" class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle">{{new Date(transaction?.created_at).toLocaleString()}}</td>
          <td class="p-4 align-middle">{{transaction?.description}}</td>
          <td class="p-4 align-middle" :class="[transaction?.type == 'income' ? 'text-green-600' : 'text-red-600']">${{transaction?.amount}}</td>
          <td class="p-4 align-middle flex gap-1">
            <button class="bg-green-600 px-3 py-2 text-white rounded-lg"><i class="fa-solid fa-pen"></i></button>
            <button @click="deleteTransaction(transaction?.id)" class="bg-red-600 px-3 py-2 text-white rounded-lg"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
          <tr>Тут пока ничего нет...</tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>