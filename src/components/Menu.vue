<template>
  <nav class=" mb-4 bg-blue-950 text-white sm:px-24 py-4 rounded-b-lg shadow-lg">
    <div class="container-fluid flex flex-col sm:flex-row justify-between items-center">
      <ul class="flex flex-col sm:flex-row justify-around sm:justify-start space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
        <li v-for="route in routes" :key="route.name">
          <router-link v-if="route.name !== 'VisualizarClub' || $route.name === 'VisualizarClub'" :to="route.path"
                       active-class="active-link" class="hover:text-indigo-300">{{
              route.name
            }}
          </router-link>
        </li>
      </ul>
      <button @click="logout" class="mt-2 sm:mt-0 hover:text-indigo-300 bg-blue-400 p-3 rounded">Cerrar sesión</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const routes = router.getRoutes().filter(route => route.meta.showMenu);

const logout = () => {
  localStorage.removeItem('token');
  router.push({name: 'Login'});
};
</script>

<style>
.active-link {
  color: #B794F4;
}
</style>