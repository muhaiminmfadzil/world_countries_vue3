import { computed, watch, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountrySanitize } from '@/interfaces/country'
import { stringHighlighter } from '@/utilities/filters'
import { ESort, ESortId } from '@/enums/sort'

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
    id: null as ESortId | null,
    sort: null as ESort | null
  })
  // Toggle sort
  const toggleSort = () => {
    if (sorting.value.sort === null) return (sorting.value.sort = ESort.ASC)
    if (sorting.value.sort === ESort.ASC) return (sorting.value.sort = ESort.DESC)
    if (sorting.value.sort === ESort.DESC) {
      sorting.value.sort = null
      sorting.value.id = null
    }
  }
  // Set sorting option
  const setSorting = (id: ESortId) => {
    // Reset sorting if select new id
    if (sorting.value.id !== id) {
      sorting.value.sort = null
    }
    sorting.value.id = id
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
          computedName:
            search.length > 0 ? stringHighlighter(country.computedName, search) : country.name
        }
        if (country.capital && country.capital?.length > 0) {
          result.computedCapital =
            search.length > 0 ? stringHighlighter(country.capital!, search) : country.capital
        }

        return result
      })
    // Sorting
    if (sorting.value.id && sorting.value.sort) {
      result.sort((prev, next) => {
        const prevCountry = prev[sorting.value.id as keyof ICountrySanitize] as string
        const nextCountry = next[sorting.value.id as keyof ICountrySanitize] as string
        return sorting.value.sort === ESort.ASC
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
  // Filter selected countries
  const filterSelectedCountries = computed((): ICountrySanitize[] => {
    // Filter by sorted items if not in search mode
    if (searchText.value === '' && sorting.value.id && sorting.value.sort) {
      return filteredCountries.value.filter((country) => country.isSelected)
    }
    // Filter by all countries by default
    return allCountries.value.filter((country) => country.isSelected)
  })
  // Watch filtered data and save selected country by id to local storage
  watch(filterSelectedCountries, (newValue: ICountrySanitize[]) => {
    localStorage.setItem(
      SELECTED_COUNTRIES_KEY,
      JSON.stringify(newValue.map((country) => country.id))
    )
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
