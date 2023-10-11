<script setup lang="ts">
import CountryTableHead from '@/components/CountryTableHead.vue'
import CountryTableBody from '@/components/CountryTableBody.vue'
</script>

<template>
  <div class="w-full mr-4 pb-2 overflow-auto h-[80dvh]">
    <table class="w-full border-separate border-spacing-0">
      <!-- Table Head -->
      <CountryTableHead data-test="table-head" />
      <!-- Table Body -->
      <CountryTableBody data-test="table-body" />
    </table>
  </div>
</template>

<style scoped></style>
