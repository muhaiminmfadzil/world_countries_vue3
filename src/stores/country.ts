import { computed, watch, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountrySanitize } from '@/interfaces/country'
import { stringHighlighter } from '@/utilities/filters'

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
  const filteredCountries = computed(() => {
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
  // Selected countries key
  const SELECTED_COUNTRIES_KEY = 'selected_countries'
  // Filter selected countries and return by ids
  const filterSelectedCountries = computed(() => {
    return allCountries.value.filter((country) => country.isSelected).map((country) => country.id)
  })
  // Watch filtered data and save selected country to local storage
  watch(filterSelectedCountries, (newValue) => {
    localStorage.setItem(SELECTED_COUNTRIES_KEY, JSON.stringify(newValue))
  })
  // Get local storage data
  const getLocalSelectedCountries = computed((): String[] => {
    return localStorage.getItem(SELECTED_COUNTRIES_KEY)
      ? JSON.parse(localStorage.getItem(SELECTED_COUNTRIES_KEY)!)
      : []
  })
  // Set selected country
  const setSelectedCountry = (selectedCountry: ICountrySanitize) => {
    const index = allCountries.value.findIndex((country) => country.id === selectedCountry.id)
    if (index >= 0) {
      allCountries.value.splice(index, 1, selectedCountry)
    }
  }
  // Select or delect all
  const setSelectAllCountries = (selected: boolean) => {
    allCountries.value = allCountries.value.map((country) => {
      return {
        ...country,
        isSelected: selected
      }
    })
  }

  return {
    allCountries,
    filteredCountries,
    setCountries,
    searchText,
    getLocalSelectedCountries,
    setSelectedCountry,
    filterSelectedCountries,
    setSelectAllCountries
  }
})
