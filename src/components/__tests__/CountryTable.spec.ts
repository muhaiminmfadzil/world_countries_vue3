import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import CountryTable from '@/components/CountryTable.vue'
import { ERegion } from '@/interfaces/country'

describe('CountryTable: render', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = shallowMount(CountryTable, {
      props: {
        parentCountries: [
          {
            isSelected: false,
            name: {
              common: 'Malaysia',
              official: 'Malaysia Official',
              nativeName: undefined
            },
            capital: 'Kuala Lumpur',
            flag: '🇲🇾',
            region: ERegion.Asia
          }
        ]
      }
    })
    await wrapper.setProps({})
  })

  it('renders table head with each items', () => {
    // Head
    expect(wrapper.find('[data-test="table-head"]').exists()).toBe(true)
    // Each items
    const tableHead = wrapper.get('[data-test="table-head"]')
    expect(tableHead.find('[data-test="head-checkbox"]').exists()).toBe(true)
    expect(tableHead.find('[data-test="head-flag"]').exists()).toBe(true)
    expect(tableHead.find('[data-test="head-name"]').exists()).toBe(true)
    expect(tableHead.find('[data-test="head-region"]').exists()).toBe(true)
    expect(tableHead.find('[data-test="head-capital"]').exists()).toBe(true)
  })

  it('renders table data correctly', () => {
    const tableData = wrapper.findAll('[data-test="data-row"]')
    // Return one row only
    expect(tableData.length).toBe(1)
    // Each items should render
    expect(tableData[0].find('[data-test="data-checkbox"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-flag"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-name"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-region"]').exists()).toBe(true)
    expect(tableData[0].find('[data-test="data-capital"]').exists()).toBe(true)
    // Each items should display correct data
    expect(tableData[0].get('[data-test="data-flag"]').text()).toBe('🇲🇾')
    expect(tableData[0].get('[data-test="data-name"]').text()).toBe('Malaysia')
    expect(tableData[0].get('[data-test="data-region"]').text()).toBe('Asia')
    expect(tableData[0].get('[data-test="data-capital"]').text()).toBe('Kuala Lumpur')
  })
})
