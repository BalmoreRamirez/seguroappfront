<template>
  <div class="p-4 sm:p-6">
    <h1 class="text-blue-950 mb-4">Lista de clubes</h1>
    <div class="flex items-center mb-4">
      <InputText type="text" v-model="value" placeholder="Buscar club..." class="flex-grow mr-2"/>
      <Button label="Buscar" icon="pi pi-search"/>
    </div>
    <div>
      <h2 class="text-blue-950 mb-2">Clubes</h2>
      <DataTable :products="products" :columns="columns" :actions="actions" @action="handleAction"></DataTable>
    </div>
  </div>
  <Dialog v-model:visible="editDialogVisible" maximizable modal header="Editar Club" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <form @submit.prevent="submit" class="flex flex-col">
      <label for="name">Nombre del Club:</label>
      <InputText id="name" v-model="productToEdit.name" type="text"/>

      <label for="category">Zona:</label>
      <InputText id="category" v-model="productToEdit.category" type="text"/>

      <label for="quantity">Miembros:</label>
      <InputText id="quantity" v-model="productToEdit.quantity" type="number"/>

      <div class="flex justify-center space-x-2 pt-5">
        <Button label="Cancelar" @click="cancel" class="p-button-secondary"/>
        <Button type="submit" label="Guardar" class="p-button-primary"/>
      </div>
    </form>
  </Dialog>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from '../axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from '../components/DataTable.vue';
import Dialog from 'primevue/dialog';

const router = useRouter();

const value = ref(null);
const editDialogVisible = ref(false);
const productToEdit = ref(null);
const columns = ref([
  {field: 'id', header: 'Id'},
  {field: 'nombre', header: 'Club'},
  {field: 'iglesia', header: 'Zona'},
  {field: 'distrito', header: 'Distrito'}
]);
const products = ref([]);

const fetchClubs = async () => {
  try {
    const response = await axios.get('/clubs');
    products.value = response.data;
  } catch (error) {
    console.error('Error al obtener los clubes', error);
  }
};

onMounted(fetchClubs);

const openEditDialog = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (!product) {
    console.error(`No se encontró el producto con id ${productId}`);
    return;
  }
  productToEdit.value = {...product};
  editDialogVisible.value = true;
};

const submit = () => {
  const index = products.value.findIndex(p => p.id === productToEdit.value.id);
  if (index !== -1) {
    products.value[index] = {...productToEdit.value};
  }
  editDialogVisible.value = false;
};

const cancel = () => {
  editDialogVisible.value = false;
};

const viewProduct = (product) => {
  router.push({name: 'VisualizarClub', params: {id: product.id}});
};

const actions = ref([
  {name: 'view', icon: 'pi pi-eye', class: 'p-button-rounded p-button-success p-mr-2'},
  {name: 'edit', icon: 'pi pi-pencil', class: 'p-button-rounded p-button-primary p-mr-2'},
  {name: 'delete', icon: 'pi pi-trash', class: 'p-button-rounded p-button-danger'}
]);

const handleAction = ({product, actionName}) => {
  switch (actionName) {
    case 'view':
      viewProduct(product);
      break;
    case 'edit':
      openEditDialog(product.id);
      break;
    case 'delete':
      break;
  }
};
</script>