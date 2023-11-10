<script setup lang="ts">
import {ref} from "vue";
import {api} from "@/api";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

async function signUp() {
  await api.post("/auth/signup", {
    "name": name.value,
    "email": email.value,
    "password": password.value
  }).then(res => {
    const token = res.data?.token;
    localStorage.setItem("TOKEN", token)
    store.commit("setToken", token)
    router.push("/");
  })
}
</script>

<template>
  <div class="mx-auto max-w-md px-6 py-12 bg-white rounded-xl shadow-md space-y-8">
    <h1 class="text-3xl font-bold text-center">Регистрация</h1>
    <form class="mt-8 space-y-6">
      <div class="grid grid-cols-1 space-y-4">
        <label for="first-name" class="text-sm font-bold text-gray-500 tracking-wide">
          Имя
        </label>
        <input
            id="name"
            class="py-2 px-4 block w-full rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Имя"
            type="text"
            v-model="name"
        />
        <label for="email" class="text-sm font-bold text-gray-500 tracking-wide">
          Почта
        </label>
        <input
            id="email"
            class="py-2 px-4 block w-full rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="john.doe@example.com"
            type="email"
            v-model="email"
        />
        <label for="password" class="text-sm font-bold text-gray-500 tracking-wide">
          Пароль
        </label>
        <input
            id="password"
            placeholder="Введите пароль"
            class="py-2 px-4 block w-full rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            v-model="password"
        />
      </div>
      <button
          class="inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none"
          @click.prevent="signUp"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>