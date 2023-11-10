<script setup lang="ts">

import {useStore} from "@/store";

const store = useStore();

function logout() {
  store.token = "";
  localStorage.removeItem("TOKEN");
}
</script>

<template>

  <header class="flex justify-between items-center p-6 bg-white">
    <RouterLink to="/">
      <div class="flex items-center space-x-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class=" h-6 w-6 text-green-500"
        >
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <span class="text-2xl font-bold text-gray-900">Finance Tracker</span>
      </div>
    </RouterLink>
    <div v-if="store.token" class="flex gap-3">
      <p class="inline-flex items-center">{{store.user.name}}</p>
        <button @click="logout" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-700 border-gray-700">
          Выйти
        </button>
      </div>
    <div v-else class="flex gap-3">
    <RouterLink to="/signin" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-700 border-gray-700">
      Вход
    </RouterLink>
    <RouterLink to="/signup" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-600 text-white">
      Регистрация
    </RouterLink>
    </div>
  </header>
</template>