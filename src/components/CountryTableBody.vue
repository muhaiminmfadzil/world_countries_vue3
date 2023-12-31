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
      class="text-lg cursor-pointer"
      :class="[
        country.isSelected
          ? 'bg-indigo-100 hover:shadow-inner hover:bg-indigo-200'
          : 'hover:shadow-lg'
      ]"
      @click="handleSelectedCountry(country)"
    >
      <!-- Checkbox -->
      <td
        data-test="data-checkbox"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          'relative w-12 px-7'
        ]"
      >
        <input
          type="checkbox"
          class="absolute w-4 h-4 -mt-2 text-indigo-600 border-gray-300 rounded cursor-pointer left-4 top-1/2 focus:ring-indigo-600"
          :checked="country.isSelected"
        />
      </td>
      <!-- Flag -->
      <td
        data-test="data-flag"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
        ]"
      >
        {{ country.flag }}
      </td>
      <!-- Name -->
      <td
        data-test="data-name"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm sm:table-cell'
        ]"
      >
        <div v-html="country.computedName"></div>
      </td>
      <!-- Region -->
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
      <!-- Capital -->
      <td
        data-test="data-capital"
        :class="[
          countryIdx !== filteredCountries.length - 1 ? 'border-b border-gray-200' : '',
          country.isSelected ? 'text-indigo-500 font-medium' : 'text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm lg:table-cell'
        ]"
      >
        <div v-html="country.computedCapital"></div>
      </td>
    </tr>
  </tbody>
</template>

<style scoped></style>
