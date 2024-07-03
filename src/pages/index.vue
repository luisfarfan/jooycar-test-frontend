<template>
  <TripList :items="trips" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TripList from '@/components/TripList.vue';
import { useTripStore } from "@/stores/trip";
import { Trip } from "@/models/trip.models";

const trips = ref<Trip[]>([]);

const tripStore = useTripStore();

const loadTrips = async () => {
  await tripStore.fetchTrips({});
  trips.value = tripStore.trips;
};

onMounted(loadTrips);

</script>
