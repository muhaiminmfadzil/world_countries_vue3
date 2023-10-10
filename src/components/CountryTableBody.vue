<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCountryStore } from '@/stores/country'
import type { ICountrySanitize } from '@/interfaces/country'
// Country store
const countryStore = useCountryStore()
// Data
const { filteredCountries } = storeToRefs(countryStore)
// Selection
const handleSelectedCountry = (selectedCountry: ICountrySanitize) => {
  const selection = { ...selectedCountry, isSelected: !selectedCountry.isSelected }
  countryStore.setSelectedCountry(selection)
}
</script>

<template>
  <!-- Table Body -->
  <tbody class="bg-white">
    <tr
      v-for="(country, countryIdx) in filteredCountries"
      :key="country.name"
      data-test="data-row"
      :class="[{ 'bg-indigo-100': country.isSelected }]"
    >
      <td
        data-test="data-checkbox"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          'relative w-12 px-7'
        ]"
      >
        <input
          type="checkbox"
          class="absolute w-4 h-4 -mt-2 text-indigo-600 border-gray-300 rounded left-4 top-1/2 focus:ring-indigo-600"
          :checked="country.isSelected"
          @click="handleSelectedCountry(country)"
        />
      </td>
      <td
        data-test="data-flag"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
        ]"
      >
        {{ country.flag }}
      </td>
      <td
        data-test="data-name"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm sm:table-cell'
        ]"
      >
        <div v-html="country.name"></div>
      </td>
      <td
        data-test="data-region"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm lg:table-cell'
        ]"
      >
        {{ country.region }}
      </td>
      <td
        data-test="data-capital"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm lg:table-cell'
        ]"
      >
        <div v-html="country.capital"></div>
      </td>
    </tr>
  </tbody>
</template>

<style scoped></style>
