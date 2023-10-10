import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountrySanitize } from '../interfaces/country'
import { stringHighlighter } from '../utilities/filters'

export const useCountryStore = defineStore('country', () => {
  // Country list
  const allCountries = ref([]) as Ref<ICountrySanitize[]>
  // Set countries
  const setCountries = (data: ICountrySanitize[]) => {
    allCountries.value = data
  }
  // Search countries
  const searchText = ref('')
  // Get filtered countries
  const countries = computed(() => {
    const search = searchText.value.toLowerCase()
    return (
      allCountries.value
        // Filter by search
        .filter((country) => {
          const name = country.name.toLowerCase()
          const capital = country.capital?.toLowerCase()

          return name.includes(search) || capital?.includes(search)
        })
        // Highlighter
        .map((country) => {
          const result = {
            ...country,
            name: stringHighlighter(country.name, search)
          }
          if (country.capital && country.capital?.length > 0) {
            result.capital = stringHighlighter(country.capital!, search)
          }

          return result
        })
    )
  })

  return { countries, setCountries, searchText }
})
