<template>
  <div class="flex items-center justify-center h-screen p-6 sm:p-24 relative"
       :style="`background-image: url(${backgroundImage}); background-size: cover; background-position: center;`">
    <div class="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50"></div>
    <form
        class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 z-10">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Usuario
        </label>
        <InputText id="username" v-model="username"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Contraseña
        </label>
        <InputText id="password" type="password" v-model="password"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="flex items-center justify-between">
        <Button label="Iniciar sesión" @click="login" icon="pi pi-sign-in" icon-pos="right"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from '../axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useToast} from "primevue/usetoast";
import backgroundImage from '../assets/login.jpg';

const router = useRouter();
const username = ref('');
const password = ref('');
const toast = useToast();

const login = async () => {
  try {
    const response = await axios.post('/auth_usuario/authenticate', {
      usuario: username.value,
      password: password.value
    });

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem('token', response.data.accessToken);
      await router.push({name: 'Inicio'});
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error de autenticación',
        detail: 'Las credenciales proporcionadas son incorrectas.',
        life: 3000
      });
    }
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error de la solicitud', detail: error.message, life: 3000});
  }
};
</script>
