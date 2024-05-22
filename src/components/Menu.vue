<template>
  <nav class="mb-4 bg-blue-950 text-white px-24 py-4 rounded-b-lg shadow-lg">
    <div class="flex justify-between">
      <ul class="flex justify-around sm:justify-start space-x-0 sm:space-x-4">
        <li v-for="route in routes" :key="route.name">
          <router-link :to="route.path" active-class="active-link" class="hover:text-indigo-300">{{ route.name }}</router-link>
        </li>
      </ul>
      <button @click="logout" class="hover:text-indigo-300">Cerrar sesión</button>
    </div>
  </nav>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const routes = router.getRoutes().filter(route => route.meta.showMenu);

    const logout = () => {
      localStorage.removeItem('token');
      router.push({name: 'Login'});
    };

    return {
      routes,
      logout
    };
  }
}
</script>
<style>
.active-link {
  color: #B794F4;
}
</style>