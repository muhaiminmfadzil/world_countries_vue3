<script setup lang="ts">
import CountryTable from '@/components/CountryTable.vue'
</script>

<template>
  <main class="max-w-[75dvw] mx-auto p-5">
    <!-- Heading -->
    <h1 class="text-3xl font-semibold">World Countries</h1>
    <!-- Descriptions -->
    <p class="mt-2 text-sm text-gray-700">A list of all the countries in the world</p>
    <CountryTable />
  </main>
</template>
