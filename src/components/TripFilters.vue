<template>
  <VueDatePicker v-model="date" range @change="emitFilters" />
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 7));

const date = ref<[Date, Date] | null>([startDate, endDate]);

const emits = defineEmits(['updateFilters']);

watch(() => date.value, () => {
  emitFilters();
});
const emitFilters = () => {
  if (date.value) {
    const [startGte, startLte] = date.value;
    emits('updateFilters', { start_gte: startGte, start_lte: startLte });
    console.log('emitFilters', startGte, startLte);
  }
};
</script>