

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/AuthStore'




createApp(App).use(createPinia()).use(router).mount('#app')




const auth = useAuthStore();
auth.initAuth(); // Set token from localStorage on load

