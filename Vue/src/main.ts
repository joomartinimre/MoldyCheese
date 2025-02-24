import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vuetify from './libs/vuetify'

const app = createApp(App)
const pinia = createPinia();

app.use(createPinia())
app.use(pinia);
app.use(router)
app.use(vuetify)

import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
authStore.loadFromLocalStorage();

app.mount('#app')
