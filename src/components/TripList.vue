<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Trip } from "@/models/trip.models";

const props = defineProps({
  items: {
    type: Array as () => Trip[],
    required: true,
},
});

const emits = defineEmits(['selectTrip'])
const handleAction = (item: Trip) => {
  console.log('selected trip list'  , item)
  emits('selectTrip', item);
};
</script>

<template>
  <div class="p-4">
    <table class="min-w-full">
      <thead class="bg-blue-100">
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Inicio
        </th>
        <th class="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Término
        </th>
        <th class="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Distancia y tiempo
        </th>
        <th class="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in props.items" :key="index" class="hover:bg-blue-200">
        <td class="px-6 py-4 whitespace-no-wrap border-b">{{ item.start.address }}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b">{{ item.end.address}}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b">{{ item.overspeedsCount }}kms y {{ item.durationByStartAndEndTime }}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b">
          <v-btn  icon="" @click="() => handleAction(item)">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="sass">

</style>