import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import CountryTable from '@/components/CountryTable.vue'

describe('CountryTable: render', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(CountryTable)
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
})
