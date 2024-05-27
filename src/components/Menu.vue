<template>
  <ProgressBar :value="sessionTime" :show-value="false" class="h-1"></ProgressBar>
  <nav class="mb-4 bg-blue-950 text-white px-4 sm:px-24 py-4 rounded-b-lg shadow-lg">
    <div class="flex flex-col sm:flex-row justify-between">
      <ul class="flex flex-col sm:flex-row justify-around sm:justify-start space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
        <li v-for="route in routes" :key="route.name">
          <router-link :to="route.path" active-class="active-link" class="hover:text-indigo-300">{{
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
import {ref, onMounted, onUnmounted} from 'vue';
import ProgressBar from 'primevue/progressbar';
import {useRouter} from "vue-router";
import {jwtDecode} from "jwt-decode";

const router = useRouter();
const routes = router.getRoutes().filter(route => route.meta.showMenu);
const sessionTime = ref(0);
let intervalId;

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const sessionDuration = decodedToken.exp - decodedToken.iat;
    const incrementPerSecond = 100 / sessionDuration;
    intervalId = setInterval(() => {
      sessionTime.value += incrementPerSecond;
      if (sessionTime.value >= 100) {
        clearInterval(intervalId);
        localStorage.removeItem('token');
        router.push({name: 'Login'});
      }
    }, 1000);
  }
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const logout = () => {
  clearInterval(intervalId);
  localStorage.removeItem('token');
  router.push({name: 'Login'});
};

</script>

<style>
.active-link {
  color: #B794F4;
}
</style>