<script setup lang="ts">
import CountrySearch from '@/components/CountrySearch.vue'
import CountryTable from '@/components/CountryTable.vue'
</script>

<template>
  <!-- Search -->
  <CountrySearch data-test="search" />
  <!-- Table -->
  <CountryTable data-test="table" />
</template>

<style scoped></style>
