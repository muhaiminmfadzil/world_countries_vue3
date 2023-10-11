import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useCountryStore } from '@/stores/country'
import { ERegion } from '@/enums/country'
import { ESort, ESortId } from '@/enums/sort'
import type { ICountrySanitize } from '@/interfaces/country'

describe('Country Store: initialized', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialized all items correctly', () => {
    const countryStore = useCountryStore()

    expect(countryStore.allCountries.length).toBe(0)
    expect(countryStore.filteredCountries.length).toBe(0)
    expect(countryStore.searchText.length).toBe(0)
  })
})

describe('Country Store: search, filter & set selected, sort by column', () => {
  const testData: ICountrySanitize[] = [
    {
      id: 'MALAYSIA',
      isSelected: false,
      name: 'Malaysia',
      computedName: 'Malaysia',
      flag: '🇲🇾',
      capital: 'Kuala Lumpur',
      computedCapital: 'Kuala Lumpur',
      region: ERegion.Asia,
      population: 100
    },
    {
      id: 'INDONESIA',
      isSelected: true,
      name: 'Indonesia',
      computedName: 'Indonesia',
      flag: '🇮🇩',
      capital: 'Jakarta',
      computedCapital: 'Jakarta',
      region: ERegion.Africa,
      population: 1000
    },
    {
      id: 'SINGAPORE',
      isSelected: true,
      name: 'Singapore',
      computedName: 'Singapore',
      flag: '🇸🇬',
      capital: 'Singapore',
      computedCapital: 'Singapore',
      region: ERegion.Oceania,
      population: 10
    },
    {
      id: 'ONE_PIECE_KU',
      isSelected: false,
      name: 'One Piece ku',
      computedName: 'One Piece ku',
      flag: '🇸🇬',
      capital: 'Ruftel, Wano, Alabasta',
      computedCapital: 'Ruftel, Wano, Alabasta',
      region: ERegion.Europe,
      population: 200
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    // Setup data
    const countryStore = useCountryStore()
    countryStore.setCountries(testData)
  })

  it('should filter search item correctly', () => {
    const countryStore = useCountryStore()
    // Filter by text
    const span = (value: string) => {
      return `<span class="highlight">${value}</span>`
    }
    const testSearch = [
      {
        text: '',
        totalFound: 4,
        foundCountryName: ['Malaysia', 'Indonesia', 'Singapore', 'One Piece ku'],
        foundCapitalName: ['Kuala Lumpur', 'Jakarta', 'Singapore', 'Ruftel, Wano, Alabasta']
      },
      {
        text: 'sia',
        totalFound: 2,
        foundCountryName: [`Malay${span('sia')}`, `Indone${span('sia')}`],
        foundCapitalName: ['Kuala Lumpur', 'Jakarta']
      },
      {
        text: 'malaysia',
        totalFound: 1,
        foundCountryName: [`${span('Malaysia')}`],
        foundCapitalName: ['Kuala Lumpur']
      },
      {
        text: 'ku',
        totalFound: 2,
        foundCountryName: ['Malaysia', `One Piece ${span('ku')}`],
        foundCapitalName: [`${span('Ku')}ala Lumpur`, 'Ruftel, Wano, Alabasta']
      },
      {
        text: 'o',
        totalFound: 3,
        foundCountryName: [
          `Ind${span('o')}nesia`,
          `Singap${span('o')}re`,
          `${span('O')}ne Piece ku`
        ],
        foundCapitalName: ['Jakarta', `Singap${span('o')}re`, `Ruftel, Wan${span('o')}, Alabasta`]
      }
    ]

    testSearch.forEach((test) => {
      countryStore.searchText = test.text
      expect(countryStore.filteredCountries.length).toBe(test.totalFound)
      expect(countryStore.filteredCountries.map((country) => country.computedName)).toStrictEqual(
        test.foundCountryName
      )
      expect(
        countryStore.filteredCountries.map((country) => country.computedCapital)
      ).toStrictEqual(test.foundCapitalName)
    })

    // Reset search
    countryStore.searchText = ''
  })

  it('should filter selected item correctly', () => {
    const countryStore = useCountryStore()
    // Filter by selected
    expect(countryStore.filterSelectedCountries.map((country) => country.id)).toStrictEqual([
      'INDONESIA',
      'SINGAPORE'
    ])
  })

  it('should set all selected item correctly', () => {
    const countryStore = useCountryStore()
    // Select all
    countryStore.setSelectAllCountries(true)
    expect(countryStore.allCountries.every((country) => country.isSelected === true)).toBe(true)
    expect(countryStore.filterSelectedCountries.length).toBe(4)
    // Deselect all
    countryStore.setSelectAllCountries(false)
    expect(countryStore.allCountries.every((country) => country.isSelected === false)).toBe(true)
    expect(countryStore.filterSelectedCountries.length).toBe(0)
  })

  it('should handle sort tonggle correctly', () => {
    const countryStore = useCountryStore()
    // Default
    expect(countryStore.sorting).toStrictEqual({ id: null, sort: null })
    // Set column toggle test data
    const testData = [
      {
        id: ESortId.NAME,
        result: { id: ESortId.NAME, sort: ESort.ASC }
      },
      {
        id: ESortId.NAME,
        result: { id: ESortId.NAME, sort: ESort.DESC }
      },
      {
        id: ESortId.NAME,
        result: { id: null, sort: null }
      },
      {
        id: ESortId.CAPITAL,
        result: { id: ESortId.CAPITAL, sort: ESort.ASC }
      },
      {
        id: ESortId.CAPITAL,
        result: { id: ESortId.CAPITAL, sort: ESort.DESC }
      },
      {
        id: ESortId.REGION,
        result: { id: ESortId.REGION, sort: ESort.ASC }
      }
    ]

    testData.forEach((test) => {
      countryStore.setSorting(test.id)
      expect(countryStore.sorting).toStrictEqual(test.result)
    })
  })

  it('should sort data correctly', () => {
    const countryStore = useCountryStore()
    // Set toggle test data
    const testData = [
      {
        id: ESortId.NAME,
        result: ['INDONESIA', 'MALAYSIA', 'ONE_PIECE_KU', 'SINGAPORE']
      },
      {
        id: ESortId.NAME,
        result: ['SINGAPORE', 'ONE_PIECE_KU', 'MALAYSIA', 'INDONESIA']
      },
      {
        id: ESortId.REGION,
        result: ['INDONESIA', 'MALAYSIA', 'ONE_PIECE_KU', 'SINGAPORE']
      }
    ]

    testData.forEach((test) => {
      countryStore.setSorting(test.id)
      expect(countryStore.filteredCountries.map((country) => country.id)).toStrictEqual(test.result)
    })
  })
})
