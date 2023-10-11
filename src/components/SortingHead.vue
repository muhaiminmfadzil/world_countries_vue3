<script setup lang="ts">
import { reactive } from 'vue'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

// Props
defineProps<{
  id: string
  name: string
}>()

// Sorting
const sorting = reactive({
  item: '',
  sort: 'ASC'
})
const toggleSort = () => {
  if (sorting.sort === '') return (sorting.sort = 'ASC')
  if (sorting.sort === 'ASC') return (sorting.sort = 'DESC')
  if (sorting.sort === 'DESC') return (sorting.sort = '')
}
const handleSorting = (item: string) => {
  if (sorting.item === item) {
    toggleSort()
  }
  sorting.item = item
}
const isSelected = (item: string) => {
  return sorting.item === item
}
</script>

<template>
  <a href="#" class="inline-flex group" @click="handleSorting(id)">
    {{ name }}
    <template v-if="isSelected(id)">
      <template v-if="sorting.sort === 'ASC'">
        <span class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200">
          <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
        </span>
      </template>
      <template v-if="sorting.sort === 'DESC'">
        <span class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200">
          <ChevronUpIcon class="w-5 h-5" aria-hidden="true" />
        </span>
      </template>
    </template>
  </a>
</template>

<style scoped></style>
