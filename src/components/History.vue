<script setup lang="ts">
import {mapGetters, useStore} from "vuex";

const store = useStore();
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
        </tr>
        </thead>
        <tbody class="[&amp;_tr:last-child]:border-0">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Nov 9, 2023</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Salary</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-green-600">$5,000.00</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>