<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <div class="flex mt-4 mb-2 rounded-md shadow-sm">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <div
          data-test="magnify-icon"
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          data-test="search-input"
          type="text"
          name="search"
          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search by country or capital name"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
