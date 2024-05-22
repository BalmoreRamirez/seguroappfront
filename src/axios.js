// axios.js
import axios from 'axios';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router'; // Asegúrate de importar tu router

const app = createApp({});
app.use(PrimeVue);
app.use(ToastService);
const toast = app.config.globalProperties.$toast;

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    toast.add({severity:'error', summary: 'Sesión terminada', detail: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.', life: 3000});
    localStorage.removeItem('token');
    router.push('/');
  }
  return Promise.reject(error);
});

export default instance;