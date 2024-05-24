<template>
  <div class="h-screen px-4 sm:px-20 py-10 flex flex-col justify-center items-center space-y-10">
    <div class="flex space-x-4">
      <div class="bg-blue-200 p-4 rounded-lg shadow-md text-center">
        <i class="pi pi-users text-blue-600 text-2xl"></i>
        <p class="text-blue-600 text-lg">Total de clubes registrados</p>
        <p class="text-blue-950 text-2xl font-bold">{{ totalClubes }}</p>
      </div>
      <div class="bg-blue-200 p-4 rounded-lg shadow-md text-center">
        <i class="pi pi-users text-blue-600 text-2xl"></i>
        <p class="text-blue-600 text-lg">Total de usuarios registrados</p>
        <p class="text-blue-950 text-2xl font-bold">{{ totalUsuarios }}</p>
      </div>
    </div>
    <h1 class="text-2xl sm:text-3xl font-bold text-blue-950">
      ¿Que deseas hacer?
    </h1>
    <div class="flex flex-col sm:flex-row justify-center items-center space-y-10 sm:space-y-0 sm:space-x-10">
      <router-link to="/consultar"
                   class="border-2 p-6 sm:p-10 border-blue-950 rounded cursor-pointer hover:bg-blue-200 transition-colors duration-200">
        <span class="font-bold text-blue-950">
        Consultar
        </span>
      </router-link>
      <router-link to="/ingresar"
                   class="border-2 p-6 sm:p-10 border-blue-950 rounded cursor-pointer hover:bg-blue-200 transition-colors duration-200">
        <span class="font-bold text-blue-950">
        Ingresar
        </span>
      </router-link>
    </div>

  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "../axios";

const totalClubes = ref(0);
const totalUsuarios = ref(0);

onMounted(async () => {
  try {
    const responseClubes = await axios.get('/clubs');
    totalClubes.value = responseClubes.data.length;

    const responseUsuarios = await axios.get('/users');
    totalUsuarios.value = responseUsuarios.data.length;
  } catch (error) {
    console.error('Error al obtener los totales', error);
  }
});
</script>