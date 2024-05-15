<template>
  <div class="p-4 sm:p-6">
    <h1 class="text-blue-950 mb-4">Ingresar Club</h1>
    <form class="flex flex-col space-y-4">
      <InputText type="text" v-model="product.code" placeholder="Id" class="p-inputtext-sm" />
      <InputText type="text" v-model="product.name" placeholder="Club" class="p-inputtext-sm" />
      <InputText type="text" v-model="product.category" placeholder="Zona" class="p-inputtext-sm" />
      <InputText type="text" v-model="product.quantity" placeholder="Miembros" class="p-inputtext-sm" />
      <div class="flex justify-center space-x-4 mt-6">
        <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cancel" />
        <Button label="Agregar" class="p-button-rounded p-button-success" @click="add" />
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menu from '../components/Menu.vue';
const product = ref({
  code: '',
  name: '',
  category: '',
  quantity: ''
});
const router = useRouter();
const add = () => {
  // implement your add logic here
};

const cancel = () => {
  router.push('/inicio');
};
</script>