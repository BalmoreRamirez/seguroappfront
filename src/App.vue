<template>
  <div id="app">
    <Menu v-if="$route.meta.showMenu" />
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  components: {
    Menu
  }
}
</script>