import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountrySanitize } from '../interfaces/country'

export const useCountryStore = defineStore('country', () => {
  // Country list
  const countries = ref([]) as Ref<ICountrySanitize[]>
  // Set countries
  const setCountries = (data: ICountrySanitize[]) => {
    countries.value = data
  }
  // Search countries
  const searchText = ref('')

  return { countries, setCountries, searchText }
})
