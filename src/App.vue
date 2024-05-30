<template>
  <div id="app">
    <Menu v-if="$route.meta.showMenu"/>
    <div class="content">
      <router-view/>
      <Toast/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
import Toast from "primevue/toast";

export default {
  components: {
    Menu,
    Footer,
    Toast
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>