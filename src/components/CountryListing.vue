<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

import CountrySearch from '@/components/CountrySearch.vue'
import CountryTable from '@/components/CountryTable.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

import { getAllCountries } from '@/api/countriesApi'
import type { ICountry, ICountrySanitize } from '@/interfaces/country'
import { filterAllowedObjectProperties } from '@/utilities/filters'

// Data
const isLoading = ref(true)
const isError = ref(false)
let countries = ref([] as ICountrySanitize[])
// Fetching
const fetchAllCountries = async () => {
  isLoading.value = true
  const { data, success } = await getAllCountries()
  if (success) {
    countries.value = data!.map((country) => sanitizeCountry(country))
  } else {
    isError.value = true
  }
  isLoading.value = false
}
// Sanitizing data
const sanitizeCountry = (obj: ICountry): ICountrySanitize => {
  const allowedProperties = ['flag', 'name', 'region', 'capital']
  const newObj: any = filterAllowedObjectProperties(obj, allowedProperties)
  // selected checkbox
  newObj.isSelected = false
  // capital to string
  newObj.capital = obj.capital ? obj.capital.join(', ') : ''

  return newObj
}
// Mounted
onMounted(() => {
  fetchAllCountries()
})
</script>

<template>
  <template v-if="isLoading">
    <SkeletonLoader />
  </template>
  <template v-else-if="isError">
    <div class="flex flex-col gap-1 items-center justify-center h-[65dvh] text-red-400 text-sm">
      <ExclamationCircleIcon class="w-8 h-8" />
      <div>Oppss.. An error occured</div>
      <div>Please try again</div>
    </div>
  </template>
  <template v-else>
    <!-- Search -->
    <CountrySearch data-test="search" />
    <!-- Table -->
    <CountryTable data-test="table" :parentCountries="countries" />
  </template>
</template>

<style scoped></style>
