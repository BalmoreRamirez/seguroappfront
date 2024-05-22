<template>
  <div class="card">
    <DataTable :value="products" :autoLayout="true" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
      <Column header="Acciones" class="w-full sm:w-1/4">
        <template #body="slotProps">
          <div class="space-x-2">
            <Button v-for="action in actions" :key="action.name" :icon="action.icon" @click="handleAction(slotProps.data, action.name)"
                    :class="action.class"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const emit = defineEmits(['action']);
const props = defineProps({
  products: Array,
  columns: Array,
  actions: Array
});

const handleAction = (product, actionName) => {
  switch (actionName) {
    case 'view':
      emit('action', { product, actionName });
      break;
    case 'edit':
      emit('action', { product, actionName });
      break;
    case 'delete':
      console.log(`Deleting product: ${product.name}`);
      break;
  }
};
</script>