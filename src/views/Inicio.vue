<template>
  <div class="h-screen px-4 sm:px-20 py-10 flex flex-col justify-center items-center space-y-10">
    <h1 class="text-2xl sm:text-3xl font-bold text-blue-950">
      ¿Que deseas hacer?
    </h1>
    <div class="flex flex-col sm:flex-row justify-center items-center space-y-10 sm:space-y-0 sm:space-x-10">
      <router-link to="/consultar" class="border-2 p-6 sm:p-10 border-blue-950 rounded cursor-pointer hover:bg-blue-200 transition-colors duration-200">
        <span class="font-bold text-blue-950">
        Consultar
        </span>
      </router-link>
      <router-link to="/ingresar" class="border-2 p-6 sm:p-10 border-blue-950 rounded cursor-pointer hover:bg-blue-200 transition-colors duration-200">
        <span class="font-bold text-blue-950">
        Ingresar
        </span>
      </router-link>
    </div>
  </div>
</template>