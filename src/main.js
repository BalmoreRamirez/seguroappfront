import {createApp} from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/style.css'
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind/index.js";
import 'primevue/resources/themes/lara-light-teal/theme.css'
const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue,{
        unstyled: false,
        pt: Tailwind,
    })
    .mount('#app')