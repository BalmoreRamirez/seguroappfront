<template>
  <div id="app">
    <Menu v-if="$route.meta.showMenu"/>
      <router-view/>
      <Toast/>
    <Footer/>
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

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
</style>