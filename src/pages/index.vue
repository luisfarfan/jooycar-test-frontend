<template>
  <TripList :items="trips" @selectTrip="handleSelectTrip" />
  <TripDetailMap :isOpen="isModalOpen" :selectedItem="selectedItem" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TripList from '@/components/TripList.vue';
import TripDetailMap from '@/components/TripDetailMap.vue';
import { useTripStore } from "@/stores/trip";
import { Trip } from "@/models/trip.models";

const trips = ref<Trip[]>([]);

const tripStore = useTripStore();

const loadTrips = async () => {
  await tripStore.fetchTrips({});
  trips.value = tripStore.trips;
};

const selectedItem = ref<Trip | null>(null);
const isModalOpen = ref(false);

const handleSelectTrip = (item: Trip) => {
  console.log('selected trip', item)
  selectedItem.value = item;
  isModalOpen.value = true;
};


onMounted(loadTrips);

</script>
