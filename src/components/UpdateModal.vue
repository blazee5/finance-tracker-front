<script setup lang="ts">
import {computed, ref} from "vue";
import {api} from "@/api";
import {useStore} from "@/stores";

const props = defineProps({
  transaction: Object
});

const emits = defineEmits(['closeModal']);

const store = useStore();
const description = ref(props.transaction?.description);
const amount = ref(props.transaction?.amount);
const category = ref(props.transaction?.category);
const categories = computed(() => store.categories);
const type = ref(props.transaction?.type);
const date = ref(props.transaction?.Created_at);

async function updateTransaction(id: number) {
  await api.put(`/api/transactions/${id}`, {
    description: description.value,
    amount: amount.value,
    category_id: category.value.id,
    type: type.value,
    date: new Date(date.value)
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        }
      }).then(() => {
    emits("closeModal");
    store.fetchHistory();
    store.fetchAnalyze();
  })
}
</script>

<template>
  <div @click="$emit('closeModal')" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
  <div @click.stop class="rounded-lg border bg-card bg-white text-card-foreground shadow-sm w-full max-w-lg mx-5" data-v0-t="card">
    <div class="flex flex-col p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Обновить транзакцию</h3>
    </div>
    <div class="px-6 space-y-4">
      <div class="space-y-2">
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
      <div class="space-y-2">
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
      <div class="space-y-2 flex flex-col">
        <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="category"
        >
          Категория
        </label>
        <select v-model="category" class="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
          <option :value="category" v-for="category in categories" :key="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="space-y-2">
        <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="date"
        >
          Дата
        </label>
        <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="date"
            placeholder="Введите дату"
            type="date"
            v-model="date"
        />
      </div>
      <div class="space-y-2">
        <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="type"
        >
          Тип
        </label>
        <div class="flex gap-2">
          <button class="border rounded-lg p-2" @click="type ='income'" :class="{ 'bg-green-500': type === 'income', 'text-white': type === 'income' }">Доход</button>
          <button class="border rounded-lg p-2" @click="type = 'expense'" :class="{ 'bg-red-500': type === 'expense', 'text-white': type === 'expense' }">Расход</button>
        </div>
      </div>
    </div>
    <div class="flex justify-end p-6 text-white gap-2">
      <button @click="$emit('closeModal')" class="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Закрыть
      </button>
      <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      @click="updateTransaction(transaction?.id)">
        Сохранить
      </button>
    </div>
  </div>
  </div>
</template>