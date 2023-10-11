import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import CountryTableHead from '@/components/CountryTableHead.vue'

describe('CountryTableHead: render', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = shallowMount(CountryTableHead, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
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
