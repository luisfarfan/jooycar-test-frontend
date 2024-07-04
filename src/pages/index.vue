<template>
  <TripContainer>
    <template #defaultTab>
      <TripFilters @updateFilters="updateFilters"/>
      <TripList :items="trips" @selectTrip="handleSelectTrip"/>
      <TripDetailMap :is-open="isModalOpen" :on-close="closeModal" :selected-trip="selectedItem"/>
    </template>
  </TripContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TripList from '@/components/TripList.vue';
import TripDetailMap from '@/components/TripDetailMap.vue';
import { useTripStore } from "@/stores/trip";
import { Trip, TripQuery } from "@/models/trip.models";
import TripContainer from "@/components/TripContainer.vue";

const trips = ref<Trip[]>([]);

const tripStore = useTripStore();
const loadTrips = async (filters?: TripQuery) => {
  await tripStore.fetchTrips(filters || {});
  trips.value = tripStore.trips;
};

const selectedItem = ref<Trip | null>(null);
const isModalOpen = ref(false);

const handleSelectTrip = (item: Trip) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const updateFilters = (filters: { start_gte: Date | null, start_lte: Date | null }) => {
  const { start_gte, start_lte } = filters;
  const startGteTimestamp = start_gte ? start_gte.getTime() : undefined;
  const startLteTimestamp = start_lte ? start_lte.getTime() : undefined;
  loadTrips({ start_gte: startGteTimestamp, start_lte: startLteTimestamp });
};

const closeModal = () => {
  selectedItem.value = null;
  isModalOpen.value = false;
};

onMounted(loadTrips);

</script>
