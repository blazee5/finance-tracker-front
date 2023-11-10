<script setup lang="ts">
defineProps({
  title: String,
  amount: Number,
  fontColor: String
})
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">{{title}}</h3>
    </div>
    <div class="p-6">
      <p :class="'text-2xl font-bold ' + fontColor">${{amount}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>