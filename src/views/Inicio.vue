<template>
  <div class="h-screen px-4 sm:px-20 py-10 flex flex-col justify-center items-center space-y-10">

    <h1 class="text-2xl sm:text-3xl text-blue-950">
      Control de seguros
    </h1>
    <div class="flex flex-col sm:flex-row justify-center items-center space-y-10 sm:space-y-0 sm:space-x-10">
      <div
          class="flex flex-col border-2 p-6 sm:p-10 border-blue-950 rounded hover:bg-blue-200 transition-colors duration-200 text-center">
        <span class="text-blue-950 text-2xl">
        Clubes
        </span>
        <span class="font-bold text-blue-950 text-2xl">{{totalClubes}}</span>
      </div>
      <div
          class="flex flex-col border-2 p-6 sm:p-10 border-blue-950 rounded hover:bg-blue-200 transition-colors duration-200 text-center">
        <span class="text-blue-950 text-2xl">
        Miembros
        </span>
        <span class="font-bold text-blue-950 text-2xl">{{totalUsuarios}}</span>
      </div>
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