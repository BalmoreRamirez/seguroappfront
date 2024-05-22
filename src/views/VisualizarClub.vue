<template>
  <div class="p-6 sm:p-24" style="height: 100vh;">
    <div class="my-5">

      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']"/>
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <Card class="p-mb-2">
      <template #title>
        <h2 v-if="product">{{ product.nombre }}</h2>
      </template>
      <template #content>
        <div class="p-d-flex p-flex-column">
          <h3 v-if="product">Iglesia: {{ product.iglesia }}</h3>
          <p v-if="product">Distrito: {{ product.distrito }}</p>
        </div>
      </template>
    </Card>
    <div class="my-5 flex justify-end">
      <Button label="Agregar Persona" @click="openAddDialog"/>
    </div>
    <DataTable :products="personas" :columns="columns" :actions="actions"></DataTable>
  </div>
  <Dialog v-model:visible="addDialogVisible" maximizable modal header="Agregar Persona" :style="{ width: '50rem' }">
    <form class="flex flex-wrap">
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Nombre:</label>
        <InputText v-model="newUser.nombre"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Apellido:</label>
        <InputText v-model="newUser.apellido"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Edad:</label>
        <InputNumber v-model="newUser.edad"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Seguro:</label>
        <InputSwitch v-model="newUser.seguro"/>
      </div>
      <div class="w-full p-2 space-x-2 flex justify-center">
        <Button class="p-button-danger"  label="Cancelar"/>
        <Button @click="AgregarUsuarioClub" label="Agregar"/>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {computed, onBeforeMount, ref} from 'vue';
import Card from 'primevue/card';
import DataTable from "../components/DataTable.vue";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Breadcrumb from 'primevue/breadcrumb';
import axios from "../axios.js";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const people = ref([]);
const addDialogVisible = ref(false);
const newUser = ref({
      nombre: '',
      apellido: '',
      edad: null,
      seguro: true
    }
);
const route = useRoute();
const id = route.params.id;
const product = ref();
const home = ref({
  icon: 'pi pi-home',
  route: '/inicio'
});


const items = computed(() => [
  {label: 'Consultar', route: {name: 'Consultar'}},
  {
    label: product.value ? product.value.nombre : '',
    route: product.value ? {name: 'VisualizarClub', params: {id: product.value.id}} : {}
  }
]);

const columns = ref([
  {field: 'id', header: 'Id'},
  {field: 'nombre', header: 'Nombre'},
  {field: 'apellido', header: 'Apellido'},
  {field: 'edad', header: 'Edad'},
  {field: 'seguro', header: 'Seguro'}
]);

const personas = ref([]);

const openAddDialog = () => {
  addDialogVisible.value = true;
};

const AgregarUsuarioClub = async () => {
  const userData = {
    nombre: newUser.value.nombre,
    apellido: newUser.value.apellido,
    edad: newUser.value.edad,
    seguro: newUser.value.seguro
  };

  try {
    const response = await axios.post(`/users/${id}`, userData);
    personas.value.push(response.data);
    newUser.value = {nombre: '', apellido: '', edad: null, seguro: true};
    addDialogVisible.value = false;
    toast.add({severity:'success', summary: 'Éxito', detail: 'Usuario agregado correctamente', life: 3000});
  } catch (error) {
    toast.add({severity:'error', summary: 'Error', detail: 'No se pudo agregar el usuario', life: 3000});
  }
};
const actions = ref([
  {name: 'edit', icon: 'pi pi-pencil', class: 'p-button-rounded p-button-primary p-mr-2'}
]);
const handleAction = ({product, actionName}) => {
  switch (actionName) {
    case 'edit':
      break;
  }
};

const detalleClub = async (id) => {
  try {
    const response = await axios.get(`/clubs/${id}`);
    product.value = response.data;
  } catch (error) {
    console.error('Error al obtener los clubes', error);
  }
};

const usuariosAsociadosClub = async (clubId) => {
  try {
    const response = await axios.get(`/clubs/${clubId}/users`);
    personas.value = response.data.users;
  } catch (error) {
    console.error('Error al obtener los usuarios del club', error);
  }
};

onBeforeMount(() => {
  detalleClub(id)
  usuariosAsociadosClub(id)
});
</script>
