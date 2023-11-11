import './assets/style.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Toast)

app.mount('#app')