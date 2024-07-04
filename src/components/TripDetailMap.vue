<template>
  <v-dialog v-model="localIsOpen" max-width="600px">
    <v-card v-if="selectedTrip">
      <v-card-title class="headline">Mapa</v-card-title>
      <v-card-text>
        <GoogleMap
            api-key="REMOVED_API_KEY"
            style="width: 100%; height: 500px"
            :center="{
              lat: selectedTrip?.boundingBox[0].lat,
              lng: selectedTrip?.boundingBox[0].lon
            }"
            :zoom="18"
        >
          <Marker :options="{  position: { lat: selectedTrip?.start.lat, lng: selectedTrip?.start.lon } }" />
          <Marker :options="{ position: { lat: selectedTrip?.end.lat, lng: selectedTrip?.end.lon } }" />
          <Polygon :options="{
            ...polygonOptions,
            paths: selectedTrip?.boundingBox.map((point) => ({ lat: point.lat, lng: point.lon }))
          }" />
        </GoogleMap>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text="" @click="closeModal">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { GoogleMap, Polygon, Marker } from 'vue3-google-map';
import { Trip } from "@/models/trip.models";

const props = defineProps<{
  isOpen: boolean;
  onClose?: () => void;
  selectedTrip: Trip | null;
}>();

const polygonOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
}

const localIsOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
  localIsOpen.value = newVal;
});

watch(() => localIsOpen.value, (newVal) => {
  if(newVal === false) {
    closeModal();
  }
})
const closeModal = () => {
  props?.onClose && props.onClose();
};
</script>
