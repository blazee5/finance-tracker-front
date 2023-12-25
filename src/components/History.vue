<script setup lang="ts">
import {computed, ref, watch} from "vue";
import { api } from "@/api";
import UpdateModal from "@/components/UpdateModal.vue";
import {type ICategory, useStore} from "@/stores";
import CreateCategoryModal from "@/components/CreateCategoryModal.vue";

const store = useStore();
const transactions = computed(() => store.history);
const selectedTransaction = ref({});
const selectedCategory = ref({} as ICategory);
const isOpen = ref(false);
const isCreateModalOpen = ref(false);
const categories = computed(() => store.categories);

watch(selectedCategory, () => {
  store.selectedCategory = selectedCategory.value;
  store.fetchHistory()
})

async function deleteTransaction(id: number) {
  await api.delete(`/api/transactions/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN"),
    },
  }).then(() => {
    store.fetchHistory();
    store.fetchAnalyze();
  });
}
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <Teleport to="body">
      <UpdateModal v-if="isOpen" :transaction="selectedTransaction" @closeModal="isOpen = false" />
    </Teleport>
    <Teleport to="body">
      <CreateCategoryModal v-if="isCreateModalOpen" @closeModal="isCreateModalOpen = false" />
    </Teleport>
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold leading-none tracking-tight">История</h3>
    <div>
      Категория:
      <select class="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline" v-model="selectedCategory">
        <option :value="{}" selected>Все</option>
        <option :value="category" v-for="category in categories" :key="category.id">{{ category.name }}</option>
      </select>
    </div>
    <button class="w-52 inline-flex items-center justify-center rounded-md hover:bg-green-700 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-600 text-white" @click="isCreateModalOpen = true">Создать категорию</button>
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
            Категория
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
          <td class="p-4 align-middle">{{transaction?.category?.name}}</td>
          <td class="p-4 align-middle flex gap-1">
            <button @click="isOpen = true; selectedTransaction = transaction" class="bg-green-600 px-3 py-2 text-white rounded-lg"><i class="fa-solid fa-pen"></i></button>
            <button @click="deleteTransaction(transaction?.id)" class="bg-red-600 px-3 py-2 text-white rounded-lg"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
          <tr v-else>Тут пока ничего нет...</tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>