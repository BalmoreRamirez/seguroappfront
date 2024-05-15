<template>
  <div class="p-6 sm:p-24" style="height: 100vh;">
    <div class="my-5">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
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
        <h2>{{ product.name }}</h2>
      </template>
      <template #content>
        <div class="p-d-flex p-flex-column">
          <h3>Zona: {{ product.category }}</h3>
          <p>Miembros: {{ product.quantity }}</p>
        </div>
      </template>
    </Card>
    <div class="my-5 flex justify-end">
      <Button label="Agregar Persona" @click="openAddDialog"/>
    </div>
    <DataTable :products="personas" :columns="columns" :actions="actions"></DataTable>
  </div>
  <Dialog v-model:visible="addDialogVisible" maximizable modal header="Agregar Persona" :style="{ width: '50rem' }">
    <form @submit.prevent="addPerson" class="flex flex-wrap">
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Nombre:</label>
        <InputText v-model="newPerson.firstName"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Apellido:</label>
        <InputText v-model="newPerson.lastName"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Edad:</label>
        <InputNumber v-model="newPerson.age"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Seguro:</label>
        <InputText v-model="newPerson.insurance"/>
      </div>
      <div class="w-full p-2 space-x-2 flex justify-center">
        <Button class="p-button-danger" type="submit" label="Cancelar"/>
        <Button type="submit" label="Agregar"/>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {ref} from 'vue';
import Card from 'primevue/card';
import DataTable from "../components/DataTable.vue";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Breadcrumb from 'primevue/breadcrumb';

const club = ref({name: 'Orion'});
const people = ref([]);
const addDialogVisible = ref(false);
const newPerson = ref({firstName: '', lastName: '', age: null, insurance: ''});
const route = useRoute();
const id = route.params.id;
const products = ref([
  {id: '1', name: 'Orion', category: 'Zona 1', quantity: 30},
  {id: '2', name: 'Aquila', category: 'Zona 2', quantity: 25},
  {id: '3', name: 'Scorpius', category: 'Zona 3', quantity: 35}
]);
const product = products.value.find(p => p.id === id);

const home = ref({
  icon: 'pi pi-home',
  route: '/inicio'
});

const items = ref([
  {label: 'Consultar', route: {name: 'Consultar'}},
  {label: product.name, route: {name: 'VisualizarClub', params: {id: product.id}}}
]);

const columns = ref([
  {field: 'id', header: 'Id'},
  {field: 'nombre', header: 'Nombre'},
  {field: 'apellido', header: 'Apellido'},
  {field: 'edad', header: 'Edad'},
  {field: 'seguro', header: 'Seguro'}
]);

const personas = ref([
  {id: '1', nombre: 'Jose', apellido: 'Lopez', edad: 30, seguro: true},
  {id: '2', nombre: 'Manuel', apellido: 'Mendez', edad: 25, seguro: true},
  {id: '3', nombre: 'Maria', apellido: 'Ramirez', edad: 35, seguro: true}
]);

const openAddDialog = () => {
  addDialogVisible.value = true;
};

const addPerson = () => {
  people.value.push({...newPerson.value});
  newPerson.value = {firstName: '', lastName: '', age: null, insurance: ''};
  addDialogVisible.value = false;
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
</script>

<style scoped>
.p-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.p-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>