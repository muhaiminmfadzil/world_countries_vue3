import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useCountryStore } from '@/stores/country'
import { ERegion } from '@/interfaces/country'

describe('Country Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialized all items correctly', () => {
    const countryStore = useCountryStore()

    expect(countryStore.countries.length).toBe(0)
    expect(countryStore.searchText.length).toBe(0)
  })

  it('should filter item correctly', () => {
    const countryStore = useCountryStore()
    // Setup data
    const testData = [
      {
        isSelected: false,
        name: 'Malaysia',
        flag: '🇲🇾',
        capital: 'Kuala Lumpur',
        region: ERegion.Asia
      },
      {
        isSelected: false,
        name: 'Indonesia',
        flag: '🇮🇩',
        capital: 'Jakarta',
        region: ERegion.Asia
      },
      {
        isSelected: false,
        name: 'Singapore',
        flag: '🇸🇬',
        capital: 'Singapore',
        region: ERegion.Asia
      },
      {
        isSelected: false,
        name: 'One Piece ku',
        flag: '🇸🇬',
        capital: 'Ruftel, Wano, Alabasta',
        region: ERegion.Asia
      }
    ]
    countryStore.setCountries(testData)
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
      expect(countryStore.countries.length).toBe(test.totalFound)
      expect(countryStore.countries.map((country) => country.name)).toStrictEqual(
        test.foundCountryName
      )
      expect(countryStore.countries.map((country) => country.capital)).toStrictEqual(
        test.foundCapitalName
      )
    })
  })
})
