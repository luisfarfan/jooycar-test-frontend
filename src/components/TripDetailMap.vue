<template>
  <v-dialog v-model="localIsOpen" max-width="600px">
    <v-card>
      <v-card-title class="headline">Mapa</v-card-title>
      <v-card-text>
        <GoogleMap
            api-key="REMOVED_API_KEY"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="15"
        >
          <Marker :options="{ position: center }"/>
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
import { GoogleMap, Marker } from 'vue3-google-map';
import { Trip } from "@/models/trip.models";

const props = defineProps<{
  isOpen: boolean;
  onClose?: () => void;
  selectedTrip: Trip|null;
}>();

const localIsOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
  localIsOpen.value = newVal;
});

const center = {lat: 40.689247, lng: -74.044502};
const closeModal = () => {
  props?.onClose && props.onClose();
};
</script>
