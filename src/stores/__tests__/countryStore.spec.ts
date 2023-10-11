import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useCountryStore } from '@/stores/country'
import { ERegion } from '@/enums/country'

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

describe('Country Store: search, filter and set selected', () => {
  const testData = [
    {
      id: 'MALAYSIA',
      isSelected: false,
      name: 'Malaysia',
      computedName: 'Malaysia',
      flag: '🇲🇾',
      capital: 'Kuala Lumpur',
      computedCapital: 'Kuala Lumpur',
      region: ERegion.Asia
    },
    {
      id: 'INDONESIA',
      isSelected: true,
      name: 'Indonesia',
      computedName: 'Indonesia',
      flag: '🇮🇩',
      capital: 'Jakarta',
      computedCapital: 'Jakarta',
      region: ERegion.Asia
    },
    {
      id: 'SINGAPORE',
      isSelected: true,
      name: 'Singapore',
      computedName: 'Singapore',
      flag: '🇸🇬',
      capital: 'Singapore',
      computedCapital: 'Singapore',
      region: ERegion.Asia
    },
    {
      id: 'ONE_PIECE_KU',
      isSelected: false,
      name: 'One Piece ku',
      computedName: 'One Piece ku',
      flag: '🇸🇬',
      capital: 'Ruftel, Wano, Alabasta',
      computedCapital: 'Ruftel, Wano, Alabasta',
      region: ERegion.Asia
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
})
