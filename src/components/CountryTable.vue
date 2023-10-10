<script setup lang="ts">
import { toRef } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import type { ICountrySanitize } from '@/interfaces/country'
// Props
const props = defineProps<{
  parentCountries: ICountrySanitize[]
}>()

const countries = toRef(props.parentCountries)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
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
                    <span
                      class="flex-none ml-2 text-gray-900 bg-gray-100 rounded group-hover:bg-gray-200"
                    >
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
            <!-- Table Body -->
            <tbody class="bg-white">
              <tr
                v-for="(country, countryIdx) in countries"
                :key="country.name.common"
                :class="[{ 'bg-indigo-100': country.isSelected }]"
              >
                <td
                  :class="[
                    countryIdx !== countries.length - 1 ? 'border-b border-gray-200' : '',
                    'relative w-12 px-7'
                  ]"
                >
                  <input
                    type="checkbox"
                    class="absolute w-4 h-4 -mt-2 text-indigo-600 border-gray-300 rounded left-4 top-1/2 focus:ring-indigo-600"
                    v-model="country.isSelected"
                  />
                </td>
                <td
                  :class="[
                    countryIdx !== countries.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ country.flag }}
                </td>
                <td
                  :class="[
                    countryIdx !== countries.length - 1 ? 'border-b border-gray-200' : '',
                    country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
                    'whitespace-nowrap px-3 py-4 text-sm sm:table-cell'
                  ]"
                >
                  {{ country.name.common }}
                </td>
                <td
                  :class="[
                    countryIdx !== countries.length - 1 ? 'border-b border-gray-200' : '',
                    country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
                    'whitespace-nowrap px-3 py-4 text-sm lg:table-cell'
                  ]"
                >
                  {{ country.region }}
                </td>
                <td
                  :class="[
                    countryIdx !== countries.length - 1 ? 'border-b border-gray-200' : '',
                    country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
                    'whitespace-nowrap px-3 py-4 text-sm lg:table-cell'
                  ]"
                >
                  {{ country.capital }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
