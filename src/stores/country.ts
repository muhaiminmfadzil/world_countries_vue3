import { computed, watch, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountrySanitize } from '@/interfaces/country'
import { stringHighlighter } from '@/utilities/filters'

export const useCountryStore = defineStore('country', () => {
  /**
   * Country listing section
   */
  // Country list
  const allCountries = ref([]) as Ref<ICountrySanitize[]>
  // Set countries
  const setCountries = (data: ICountrySanitize[]) => {
    allCountries.value = data
  }
  /**
   * Country filtering & sorting section
   */
  // Search text
  const searchText = ref('')
  // Sorting
  const sorting = ref({
    item: null as string | null,
    sort: null as string | null
  })
  // Toggle sort
  const toggleSort = () => {
    if (sorting.value.sort === null) return (sorting.value.sort = 'ASC')
    if (sorting.value.sort === 'ASC') return (sorting.value.sort = 'DESC')
    if (sorting.value.sort === 'DESC') {
      sorting.value.sort = null
      sorting.value.item = null
    }
  }
  // Set sorting option
  const setSorting = (item: string) => {
    // Reset sorting if select new item
    if (sorting.value.item !== item) {
      sorting.value.sort = null
    }
    sorting.value.item = item
    toggleSort()
  }
  // Get filtered countries
  const filteredCountries = computed(() => {
    const search = searchText.value.toLowerCase()
    const result = allCountries.value
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
          computedName: stringHighlighter(country.computedName, search)
        }
        if (country.capital && country.capital?.length > 0) {
          result.computedCapital = stringHighlighter(country.capital!, search)
        }

        return result
      })
    // Sorting
    if (sorting.value.item && sorting.value.sort) {
      result.sort((prev, next) => {
        const prevCountry = prev[sorting.value.item as keyof ICountrySanitize] as string
        const nextCountry = next[sorting.value.item as keyof ICountrySanitize] as string
        return sorting.value.sort === 'ASC'
          ? prevCountry.localeCompare(nextCountry)
          : nextCountry.localeCompare(prevCountry)
      })
    }

    return result
  })
  /**
   * Country selection section
   */
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
    setSelectAllCountries,
    sorting,
    setSorting
  }
})
