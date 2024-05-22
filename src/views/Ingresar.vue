<template>
  <div class="max-w-lg mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6 text-center">Ingresar Club</h2>
    <form class="space-y-6">
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre del Club</label>
        <InputText type="text" v-model="v$.nombre.$model" class="w-full"/>
        <div v-if="v$.nombre.$error" class="text-red-500 text-xs">Todos los campos son requeridos</div>
      </div>
      <div>
        <label for="Iglesia" class="block text-sm font-medium text-gray-700">Iglesia</label>
        <InputText type="text" v-model="v$.iglesia.$model" class="w-full"/>
        <div v-if="v$.iglesia.$error" class="text-red-500 text-xs">Todos los campos son requeridos</div>
      </div>
      <div>
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <InputMask v-model="v$.telefono.$model" mask="99999999" placeholder="99999999"
                   class="w-full"/>
        <div v-if="v$.telefono.$error" class="text-red-500 text-xs">Todos los campos son requeridos</div>
      </div>
      <div>
        <label for="zona" class="block text-sm font-medium text-gray-700">Zona</label>
        <Dropdown v-model="v$.zona.$model" :options="zonas" placeholder="Selecciona la zona"
                  optionLabel="nombre"
                  class="w-full"/>
        <div v-if="v$.zona.$error" class="text-red-500 text-xs">Todos los campos son requeridos</div>
      </div>
      <div>
        <label for="distrito" class="block text-sm font-medium text-gray-700">Distrito</label>
        <InputText type="text" v-model="v$.distrito.$model" class="w-full"/>
        <div v-if="v$.distrito.$error" class="text-red-500 text-xs">Todos los campos son requeridos</div>
      </div>
      <div class="flex justify-between space-x-4 mt-8">
        <Button label="Cancelar" class="w-full  bg-red-500 text-white rounded hover:bg-red-600" @click="cancel"/>
        <Button label="Agregar" class="w-full  bg-green-500 text-white rounded hover:bg-green-600" @click="add"/>
      </div>
    </form>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import axios from "../axios";
import {useToast} from "primevue/usetoast";
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

const zonas = ref([]);
const router = useRouter();
const toast = useToast();

const data = ref({
  nombre: '',
  iglesia: '',
  telefono: '',
  distrito: '',
  zona: ''
});
const rules = {
  nombre: {
    required: helpers.withMessage("El campo nombre es obligatorio", required)
  },
  iglesia: {required},
  telefono: {required},
  distrito: {required},
  zona: {required}
}

const v$ = useVuelidate(rules, data);

onMounted(async () => {
  try {
    const response = await axios.get('/zonas');
    zonas.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const add = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  try {
    const response = await axios.post('/clubs/ingresar', data.value);
    toast.add({severity: 'success', summary: 'Éxito', detail: 'Registro ingresado correctamente', life: 3000});
    await router.push('/Consultar');
  } catch (error) {
    toast.add({severity: 'error', summary: 'Error de la solicitud', detail: error.message, life: 3000});
  }
};

const cancel = () => {
  router.push('/inicio');
};
</script>