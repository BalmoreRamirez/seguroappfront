<template>
  <div class="container">
    <div class="flex items-center mb-4">
      <InputText type="text" v-model="buscador" placeholder="Buscar club..." class="flex-grow mr-2"/>
    </div>
    <div>
      <div>
        <h2 class="text-3xl text-blue-950 mb-5 bg-blue-300 p-3 rounded">Lista de clubes</h2>
      </div>
      <DataTable :products="products" :columns="columns" :actions="actions" @action="handleAction"></DataTable>
    </div>
  </div>
  <Dialog v-model:visible="editDialogVisible" maximizable modal header="Editar Club" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <form class="flex flex-col">
      <label for="name">Nombre del Club:</label>
      <InputText v-model="productToEdit.nombre" type="text"/>
      <label for="Iglesia">Distrito:</label>
      <InputText v-model="productToEdit.distrito" type="text"/>

      <label for="Iglesia">Iglesia:</label>
      <InputText v-model="productToEdit.iglesia" type="text"/>

      <label for="Teléfono">Teléfono:</label>
      <InputText v-model="productToEdit.telefono" type="number"/>

      <label for="Iglesia">Zona:</label>
      <Dropdown v-model="productToEdit.zona" :options="zonas" placeholder="Selecciona la zona"
                optionLabel="nombre"
                class="w-full"/>

      <div class="flex justify-center space-x-2 pt-5">
        <Button label="Cancelar" @click="cancel" class="p-button-secondary"/>
        <Button @click="actualizarClub" label="Guardar" class="p-button-primary"/>
      </div>
    </form>
  </Dialog>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import axios from '../axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from '../components/DataTable.vue';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import {useToast} from "primevue/usetoast";

const toast = useToast();

const router = useRouter();
const zonas = ref([]);
const buscador = ref(null);
const editDialogVisible = ref(false);
const productToEdit = ref(null);
const originalProducts = ref([]);
const columns = ref([
  {field: 'id', header: 'Id'},
  {field: 'nombre', header: 'Club'},
  {field: 'zona', header: 'Zona'},
  {field: 'iglesia', header: 'Iglesia'},
  {field: 'distrito', header: 'Distrito'},
  {field: 'userCount', header: 'Miembros'},
]);
const products = ref([]);

const ListaClubes = async () => {
  try {
    const response = await axios.get('/clubs');
    originalProducts.value = response.data;
    products.value = [...originalProducts.value];
  } catch (error) {
    console.error('Error al obtener los clubes', error);
  }
};
watch(buscador, (newVal) => {
  if (!newVal) {
    products.value = [...originalProducts.value]; // Si el buscador está vacío, muestra todos los clubes
  } else {
    products.value = originalProducts.value.filter(product =>
        product.nombre.toLowerCase().includes(newVal.toLowerCase()) // Filtra los clubes basándose en el nombre
    );
  }
});
const listaZonas = async () => {
  try {
    const response = await axios.get('/zonas');
    zonas.value = response.data;
  } catch (error) {
    console.error('Error al obtener las zonas', error);
  }
};
onMounted(async () => {
  await ListaClubes();
  await listaZonas();
});

const openEditDialog = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (!product) {
    console.error(`No se encontró el producto con id ${productId}`);
    return;
  }
  productToEdit.value = {...product, zona: product.zona};

  const matchingZone = zonas.value.find(zona => zona.nombre === productToEdit.value.zona);
  console.log(matchingZone)
  console.log(productToEdit.value.zona)
  if (matchingZone) {
    productToEdit.value.zona = matchingZone;
  }
  editDialogVisible.value = true;
};

const actualizarClub = async () => {
  const index = products.value.findIndex(p => p.id === productToEdit.value.id);
  if (index !== -1) {
    products.value[index] = {...productToEdit.value};
    try {
      const response = await axios.put(`/clubs/${productToEdit.value.id}`, productToEdit.value);
      if (response.status === 200) {
        await ListaClubes()
        toast.add({severity: 'success', summary: 'Éxito', detail: 'Club actualizado con éxito', life: 3000});
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al actualizar el club: ${response.status}`,
          life: 3000
        });
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error al actualizar el club: ${error.message}`,
        life: 3000
      });
    }
  }
  editDialogVisible.value = false;
};

const eliminarClub = async (productId) => {
  const confirmation = confirm('¿Estás seguro de que quieres eliminar este club?');
  if (!confirmation) {
    return;
  }
  try {
    const response = await axios.delete(`/clubs/${productId}`);

    if (response.status !== 200) {
      toast.add({severity: 'error', summary: 'Error', detail: `Error al eliminar el club: ${response.status}`, life: 3000});
      return;
    }
    await ListaClubes();
    toast.add({severity: 'success', summary: 'Éxito', detail: 'Club eliminado con éxito', life: 3000});
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error', detail: `Error al eliminar el club: ${error.message}`, life: 3000});
  }
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
      eliminarClub(product.id);
      break;
  }
};
</script>