<template>
  <div class="flex flex-row gap-2">
    <VueDatePicker v-model="date" range @change="emitFilters" />
    <v-btn color="primary" @click="handleClick">
      Crear random trip
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 7));

const date = ref<[Date, Date] | null>([startDate, endDate]);

const emits = defineEmits(['updateFilters', 'createRandomTrip']);

watch(() => date.value, () => {
  emitFilters();
});

function handleClick() {
  emits('createRandomTrip');
}
const emitFilters = () => {
  if (date.value) {
    const [startGte, startLte] = date.value;
    emits('updateFilters', { start_gte: startGte, start_lte: startLte });
  }
};
</script>