import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import CountryTableBody from '@/components/CountryTableBody.vue'
import { useCountryStore } from '@/stores/country'
import { ERegion } from '@/interfaces/country'

describe('CountryTableBody: render', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = shallowMount(CountryTableBody, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it('renders table data correctly', async () => {
    let tableData = wrapper.findAll('[data-test="data-row"]')
    // No data
    expect(tableData.length).toBe(0)
    // Setup data
    const countryStore = useCountryStore()
    const testData = [
      {
        id: 'MALAYSIA',
        isSelected: false,
        name: 'Malaysia',
        flag: '🇲🇾',
        capital: 'Kuala Lumpur',
        region: ERegion.Asia
      },
      {
        id: 'INDONESIA',
        isSelected: false,
        name: 'Indonesia',
        flag: '🇮🇩',
        capital: 'Jakarta',
        region: ERegion.Asia
      },
      {
        id: 'SINGAPORE',
        isSelected: false,
        name: 'Singapore',
        flag: '🇸🇬',
        capital: 'Singapore',
        region: ERegion.Asia
      }
    ]
    countryStore.setCountries(testData)
    // Rerender
    await wrapper.vm.$nextTick
    // Check data
    tableData = wrapper.findAll('[data-test="data-row"]')
    expect(tableData.length).toBe(3)
    // Each items should render
    expect(tableData[0].find('[data-test="data-checkbox"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-flag"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-name"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-region"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-capital"]').exists()).toBe(true)
    // Each items should display correct data
    expect(tableData[0].get('[data-test="data-flag"]').text()).toBe(testData[0].flag)
    expect(tableData[0].get('[data-test="data-name"]').text()).toBe(testData[0].name)
    expect(tableData[0].get('[data-test="data-region"]').text()).toBe(testData[0].region)
    expect(tableData[0].get('[data-test="data-capital"]').text()).toBe(testData[0].capital)
    expect(tableData[1].get('[data-test="data-flag"]').text()).toBe(testData[1].flag)
    expect(tableData[1].get('[data-test="data-name"]').text()).toBe(testData[1].name)
    expect(tableData[1].get('[data-test="data-region"]').text()).toBe(testData[1].region)
    expect(tableData[1].get('[data-test="data-capital"]').text()).toBe(testData[1].capital)
    expect(tableData[2].get('[data-test="data-flag"]').text()).toBe(testData[2].flag)
    expect(tableData[2].get('[data-test="data-name"]').text()).toBe(testData[2].name)
    expect(tableData[2].get('[data-test="data-region"]').text()).toBe(testData[2].region)
    expect(tableData[2].get('[data-test="data-capital"]').text()).toBe(testData[2].capital)
  })
})
