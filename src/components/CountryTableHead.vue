<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useCountryStore } from '@/stores/country'
import { computed } from 'vue'
// Country store
const countryStore = useCountryStore()
// Data
const { filterSelectedCountries, allCountries } = storeToRefs(countryStore)
const isIndeterminate = computed(() => {
  return (
    filterSelectedCountries.value.length > 0 &&
    filterSelectedCountries.value.length < allCountries.value.length
  )
})
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
      <th
        data-test="head-flag"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        Flag
      </th>
      <th
        data-test="head-name"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <a href="#" class="inline-flex group">
          Name
          <span class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200">
            <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </a>
      </th>
      <th
        data-test="head-region"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <a href="#" class="inline-flex group">
          Region
          <span
            class="flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible"
          >
            <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </a>
      </th>
      <th
        data-test="head-capital"
        class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
      >
        <a href="#" class="inline-flex group">
          Capital
          <span
            class="flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible"
          >
            <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </a>
      </th>
    </tr>
  </thead>
</template>

<style scoped></style>
