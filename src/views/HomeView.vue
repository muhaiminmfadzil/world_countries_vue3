<script setup lang="ts">
import CountryListing from '@/components/CountryListing.vue'
</script>

<template>
  <main class="max-w-[75dvw] mx-auto p-5">
    <!-- Heading -->
    <h1 data-test="heading" class="text-3xl font-semibold">World Countries</h1>
    <!-- Descriptions -->
    <p data-test="description" class="mt-2 text-sm text-gray-700">
      A list of all the countries in the world
    </p>
    <!-- Listing -->
    <CountryListing />
  </main>
</template>
