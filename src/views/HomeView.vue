<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import FinanceBlock from "@/components/ui/FinanceBlock.vue";
import {computed, onMounted} from "vue";
import CreateTransaction from "@/components/CreateTransaction.vue";
import History from "@/components/History.vue";
import {useStore} from "@/store";

const store = useStore()

onMounted(() => {
  store.fetchUser();
  store.fetchAnalyze();
  store.fetchHistory();
});

const analyze = computed(() => store.analyze);

</script>

<template>
  <main>
    <div class="flex flex-col min-h-screen bg-white">
      <main class="flex-grow p-4 space-y-8">
        <div class="grid gap-4 md:grid-cols-3">
          <FinanceBlock :title="'Баланс'" :amount="analyze.total"/>
          <FinanceBlock :title="'Доходы'" :amount="analyze.total_income" :font-color="'text-green-500'"/>
          <FinanceBlock :title="'Расходы'" :amount="analyze.total_expense" :font-color="'text-red-500'"/>
        </div>
        <History/>
        <CreateTransaction/>
      </main>
      <Footer/>
    </div>
  </main>
</template>
