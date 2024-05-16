<template>
  <div id="app">
    <Menu v-if="$route.meta.showMenu" />
    <router-view />
    <Toast />
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Toast from "primevue/toast";

export default {
  components: {
    Menu,
    Toast
  }
}
</script>