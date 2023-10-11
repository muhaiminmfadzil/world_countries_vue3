<script setup lang="ts">
import CountryListing from '@/components/CountryListing.vue'
import PopulationChart from '@/components/PopulationChart.vue'
</script>

<template>
  <main class="max-w-[95dvw] mx-auto p-5">
    <!-- Heading -->
    <h1 data-test="heading" class="text-3xl font-semibold">World Countries</h1>
    <!-- Descriptions -->
    <p data-test="description" class="mt-2 text-sm text-gray-700">
      A list of all the countries in the world
    </p>
    <div class="grid grid-cols-2">
      <!-- Listing -->
      <CountryListing />
      <!-- Chart -->
      <PopulationChart />
    </div>
  </main>
</template>
