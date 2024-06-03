<template>
  <div class="card">
    <DataTable :value="products" :autoLayout="true" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #body="slotProps">
          <Tag v-if="col.field === 'seguro'">{{ slotProps.data[col.field] ? 'si' : 'no' }}</Tag>
          <span v-else-if="col.field === 'createdAt'">{{ formatDate(slotProps.data[col.field]) }}</span>
          <Tag v-else-if="col.field === 'edad'"
               :class="{
       'tag-aventurero': slotProps.data[col.field] < 10,
       'tag-aspirante': slotProps.data[col.field] > 10,
       'tag-conquistador': slotProps.data[col.field] >= 10 && slotProps.data[col.field] <= 10
     }">
            {{
              slotProps.data[col.field] < 10 ? 'Aventurero' :
                  slotProps.data[col.field] > 10 ? 'Aspirante' : 'Conquistador'
            }}
          </Tag>
          <span v-else>{{ slotProps.data[col.field] }}</span>
        </template>
      </Column>
      <Column header="Acciones" class="w-full sm:w-1/4">
        <template #body="slotProps">
          <div class="space-x-2">
            <Button v-for="action in actions" :key="action.name" :icon="action.icon"
                    @click="handleAction(slotProps.data, action.name)"
                    :class="action.class"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import {format} from 'date-fns';

const emit = defineEmits(['action']);
const props = defineProps({
  products: Array,
  columns: Array,
  actions: Array
});

const handleAction = (product, actionName) => {
  switch (actionName) {
    case 'view':
      emit('action', {product, actionName});
      break;
    case 'edit':
      emit('action', {product, actionName});
      break;
    case 'delete':
      emit('action', {product, actionName});
      break;
  }
};

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
</script>
<style scoped>
.tag-aventurero {
  background-color: blue;
}

.tag-aspirante {
  background-color: green;
}

.tag-conquistador {
  background-color: rgba(215, 215, 79, 0.94);
}

.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
}
</style>