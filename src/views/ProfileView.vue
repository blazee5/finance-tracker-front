<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import {onMounted} from "vue";
import {api} from "@/api";

const store = useUserStore();
const user = computed(() => store.user);

const name = ref(user?.value?.name);
const email = ref(user?.value?.email);

onMounted(() => {
  store.fetchUser();
});

async function updateUser() {
  await api.put("/api/user", {
    name: name.value,
    email: email.value,
  }, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN")
    }
  }).then(() => store.fetchUser())
}

async function uploadAvatar(e: Event) {
  const formData = new FormData();
  let event = e.target as HTMLInputElement;

  if (!event.files?.length) return;

  formData.append("file", event.files[0]);

  await api.post("/api/user/avatar", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN")
    }
  }).then(() => store.fetchUser())
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-grow">
      <main class="flex-grow p-4">
        <div class="grid gap-4 md:grid-cols-2 items-start">
          <div class="flex flex-col items-center gap-4">
            <div class="relative">
              <img
                  :src="user.avatar ? 'http://localhost:3000/' + user.avatar : 'placeholder.jpg'"
                  height="200"
                  width="200"
                  alt="Profile Picture"
                  class="rounded-full"
                  style="aspect-ratio: 200 / 200; object-fit: cover;"
              />
              <input type="file" @change="uploadAvatar" class="absolute inset-0 opacity-0 cursor-pointer w-[200px]">
            </div>
            <div class="text-center">
              <h2 class="text-2xl font-bold">{{ user?.name }}</h2>
              <p class="text-blue-500">{{ user?.email }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="name"
              >
                Имя
              </label>
              <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  required
                  v-model="name"
              />
            </div>
            <div class="space-y-2">
              <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="email"
              >
                Почта
              </label>
              <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  required
                  type="email"
                  v-model="email"
              />
            </div>
            <button
                class="bg-green-600 text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                @click="updateUser"
            >
              Сохранить
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>