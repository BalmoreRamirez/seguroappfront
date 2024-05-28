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
        <h2 v-if="product">Club: <span class="uppercase">{{ product?.nombre }}</span></h2>
      </template>
      <template #content>
        <div class="p-d-flex p-flex-column">
          <h2 class="text-2xl" v-if="product">Iglesia: <span class="text-primary-500">{{ product.iglesia }}</span></h2>
          <h2 class="text-2xl" v-if="product">Distrito: <span class="text-primary-500">{{ product.distrito }}</span>
          </h2>
        </div>
      </template>
    </Card>
    <div class="my-5 flex justify-end space-x-2">
      <Button label="Agregar Persona" @click="openAddDialog"/>
      <Button label="Generar PDF" @click="generatePDF" class="ml-2" icon="pi pi-file-pdf"/>
      <Button label="Importar Excel" @click="openImportDialog" class="ml-2" icon="pi pi-file-excel"/>
    </div>
    <div>
      <h2 class="text-3xl text-blue-950 mb-5 bg-blue-300 p-3 rounded">Lista de miembros de {{ product?.nombre }}</h2>
    </div>
    <DataTable :products="personas" :columns="columns" :actions="actions" @action="handleAction"></DataTable>
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
        <Button class="p-button-danger" label="Cancelar"/>
        <Button @click="AgregarUsuarioClub" label="Agregar"/>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="editDialogVisible" maximizable modal header="Editar Usuario">
    <form class="flex flex-wrap">
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Nombre:</label>
        <InputText v-model="editUser.nombre"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Apellido:</label>
        <InputText v-model="editUser.apellido"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Edad:</label>
        <InputNumber v-model="editUser.edad"/>
      </div>
      <div class="w-full sm:w-1/2 p-2 flex flex-col">
        <label>Seguro:</label>
        <InputSwitch v-model="editUser.seguro"/>
      </div>
      <div class="w-full p-2 space-x-2 flex justify-center">
        <Button class="p-button-danger" label="Cancelar"/>
        <Button @click="editarUsuario" label="Agregar"/>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="importDialogVisible" maximizable modal header="Importar Excel" :style="{ width: '50rem' }">
    <form class="flex flex-wrap">
      <div class="w-full p-2 flex flex-col">
        <label>Archivo:</label>
        <input type="file" @change="handleFileUpload"/>
      </div>
      <div class="w-full p-2 space-x-2 flex justify-center">
        <Button class="p-button-danger" label="Cancelar"/>
        <Button @click="importFromExcel" label="Importar"/>
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
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';

const toast = useToast();
const route = useRoute();
const id = route.params.id;
const product = ref();
const personas = ref([]);

const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const editUser = ref(null);
const newUser = ref({
      nombre: '',
      apellido: '',
      edad: null,
      seguro: true
    }
);

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


const openAddDialog = () => {
  addDialogVisible.value = true;
};

const openEditDialog = (user) => {
  editUser.value = {...user};
  editDialogVisible.value = true;
};

const actions = ref([
  {name: 'edit', icon: 'pi pi-pencil', class: 'p-button-rounded p-button-primary p-mr-2'},
  {name: 'delete', icon: 'pi pi-trash', class: 'p-button-rounded p-button-danger'}
]);

const handleAction = ({product, actionName}) => {
  switch (actionName) {
    case 'edit':
      openEditDialog(product);
      break;
    case 'delete':
      deleteProduct(product);
      break;
  }
};
const importDialogVisible = ref(false);
let fileToUpload = null;

const openImportDialog = () => {
  importDialogVisible.value = true;
};

const handleFileUpload = (event) => {
  fileToUpload = event.target.files[0];
};

const importFromExcel = async () => {
  if (!fileToUpload) {
    toast.add({severity: 'error', summary: 'Error', detail: 'No file selected', life: 3000});
    return;
  }

  const formData = new FormData();
  formData.append('file', fileToUpload);

  try {
    await axios.post(`/users/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.add({severity: 'success', summary: 'Éxito', detail: 'Data imported successfully', life: 3000});
    importDialogVisible.value = false;
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Failed to import data', life: 3000});
  }
};
const generatePDF = () => {
  if (product.value) {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Lista de miembros de " + product.value.nombre, 10, 20);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100);
    doc.text("Iglesia: " + product.value.iglesia, 10, 30);
    doc.text("Distrito: " + product.value.distrito, 10, 40);

    const data = personas.value.map(persona => [
      persona.nombre,
      persona.apellido,
      persona.edad,
      persona.seguro ? 'Sí' : 'No'
    ]);

    autoTable(doc, {
      head: [['Nombre', 'Apellido', 'Edad', 'Seguro']],
      body: data,
      startY: 50
    });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);

    doc.save("miembros.pdf");
    toast.add({severity: 'success', summary: 'Éxito', detail: 'PDF generado correctamente', life: 3000});
  } else {
    toast.add({severity: 'error', summary: 'Error', detail: 'No se pudo generar el PDF', life: 3000});
  }
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
    toast.add({severity: 'success', summary: 'Éxito', detail: 'Usuario agregado correctamente', life: 3000});
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error', detail: 'No se pudo agregar el usuario', life: 3000});
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

const editarUsuario = async () => {
  try {
    const response = await axios.put(`/users/${editUser.value.id}`, editUser.value);
    const index = personas.value.findIndex(p => p.id === editUser.value.id);
    if (index !== -1) {
      personas.value[index] = {...response.data};
    }
    editDialogVisible.value = false;
    toast.add({severity: 'success', summary: 'Éxito', detail: 'Usuario editado correctamente', life: 3000});
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error', detail: 'No se pudo editar el usuario', life: 3000});
  }
};

const deleteProduct = async (product) => {
  const confirmation = confirm('¿Estás seguro de que quieres eliminar este usuario?');
  if (confirmation) {
    try {
      await axios.delete(`/users/${product.id}`);
      const index = personas.value.findIndex(p => p.id === product.id);
      if (index !== -1) {
        personas.value.splice(index, 1);
      }
      toast.add({severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente', life: 3000});
    } catch (error) {
      toast.add({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario', life: 3000});
    }
  }
};
onBeforeMount(() => {
  detalleClub(id)
  usuariosAsociadosClub(id)
});
</script>
