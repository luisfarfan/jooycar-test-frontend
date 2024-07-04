<script setup lang="ts">
const tab = 1;
</script>

<template>
  <div class="h-full">
    <v-tabs
        align-tabs="center"
        color="primary"
    >
      <v-tab :value="1">Viajes</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" class="h-full">
      <v-tabs-window-item
          :key="1"
          :value="1"
      >
        <v-container fluid>
          <slot :name="'defaultTab'"></slot>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<style scoped lang="sass">

</style>