<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ESort, ESortId } from '@/enums/sort'
// Props
defineProps<{
  id: ESortId
  name: string
}>()
// Store
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
const countryStore = useCountryStore()
const { sorting } = storeToRefs(countryStore)
// Is selected
const isSelected = (id: ESortId) => {
  return sorting.value.id === id
}
</script>

<template>
  <a href="#" class="inline-flex group" @click="countryStore.setSorting(id)">
    <!-- Name -->
    <div data-test="name">{{ name }}</div>
    <!-- Sorting icons -->
    <template v-if="isSelected(id)">
      <template v-if="sorting.sort === ESort.ASC">
        <span
          data-test="chevron-down"
          class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200"
        >
          <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
        </span>
      </template>
      <template v-if="sorting.sort === ESort.DESC">
        <span
          data-test="chevron-up"
          class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200"
        >
          <ChevronUpIcon class="w-5 h-5" aria-hidden="true" />
        </span>
      </template>
    </template>
  </a>
</template>

<style scoped></style>
