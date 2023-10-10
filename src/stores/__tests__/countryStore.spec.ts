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
        foundCountryName: [
          'Malay<span class="highlight">sia</span>',
          'Indone<span class="highlight">sia</span>'
        ],
        foundCapitalName: ['Kuala Lumpur', 'Jakarta']
      },
      {
        text: 'malaysia',
        totalFound: 1,
        foundCountryName: ['<span class="highlight">Malaysia</span>'],
        foundCapitalName: ['Kuala Lumpur']
      },
      {
        text: 'ku',
        totalFound: 2,
        foundCountryName: ['Malaysia', 'One Piece <span class="highlight">ku</span>'],
        foundCapitalName: ['<span class="highlight">Ku</span>ala Lumpur', 'Ruftel, Wano, Alabasta']
      },
      {
        text: 'o',
        totalFound: 3,
        foundCountryName: [
          'Ind<span class="highlight">o</span>nesia',
          'Singap<span class="highlight">o</span>re',
          '<span class="highlight">O</span>ne Piece ku'
        ],
        foundCapitalName: [
          'Jakarta',
          'Singap<span class="highlight">o</span>re',
          'Ruftel, Wan<span class="highlight">o</span>, Alabasta'
        ]
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
