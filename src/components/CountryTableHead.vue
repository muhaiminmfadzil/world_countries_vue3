<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import SortingHead from '@/components/SortingHead.vue'
import { useCountryStore } from '@/stores/country'

// Country store
const countryStore = useCountryStore()
// Data
const { filterSelectedCountries, allCountries } = storeToRefs(countryStore)
// Indeterminate
const isIndeterminate = computed(() => {
  return (
    filterSelectedCountries.value.length > 0 &&
    filterSelectedCountries.value.length < allCountries.value.length
  )
})
// Check items
const handleCheckItems = (event: Event) => {
  const target = event.target as HTMLInputElement
  const setChecked = target.checked
  countryStore.setSelectAllCountries(setChecked)
}
</script>

<template>
  <!-- Table Head -->
  <thead data-test="table-head">
    <tr>
      <!-- Checkbox -->
      <th
        data-test="head-checkbox"
        class="sticky top-0 z-10 w-12 px-6 bg-white bg-opacity-75 border-b border-gray-300"
      >
        <input
          type="checkbox"
          class="absolute w-4 h-4 -mt-2 text-indigo-600 border-gray-300 rounded left-4 top-1/2 focus:ring-indigo-600"
          :checked="isIndeterminate || filterSelectedCountries.length === allCountries.length"
          :indeterminate="isIndeterminate"
          @change="handleCheckItems"
        />
      </th>
      <!-- Flag -->
      <th
        data-test="head-flag"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        Flag
      </th>
      <!-- Name -->
      <th
        data-test="head-name"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <SortingHead name="Name" id="name" />
      </th>
      <!-- Region -->
      <th
        data-test="head-region"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <SortingHead name="Region" id="region" />
      </th>
      <!-- Capital -->
      <th
        data-test="head-capital"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <SortingHead name="Capital" id="capital" />
      </th>
    </tr>
  </thead>
</template>

<style scoped></style>
