import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import SortingHead from '@/components/SortingHead.vue'
import { ESortId } from '@/enums/sort'
import { useCountryStore } from '@/stores/country'

describe('SortingHead: render', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = shallowMount(SortingHead, {
      props: {
        id: ESortId.CAPITAL,
        name: 'Capital'
      },
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

  it('renders title correctly', () => {
    // Div should exist
    expect(wrapper.find('[data-test="name"]').exists()).toBe(true)
    // Each items
    expect(wrapper.get('[data-test="name"]').text()).toBe('Capital')
  })

  it('renders icons correctly', async () => {
    const countryStore = useCountryStore()
    // No sorting
    expect(wrapper.find('[data-test="chevron-up"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="chevron-down"]').exists()).toBe(false)
    // Sort by other items
    await countryStore.setSorting(ESortId.NAME)
    expect(wrapper.find('[data-test="chevron-up"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="chevron-down"]').exists()).toBe(false)
    // Sort by same item
    await countryStore.setSorting(ESortId.CAPITAL)
    expect(wrapper.find('[data-test="chevron-up"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="chevron-down"]').exists()).toBe(true)
    await countryStore.setSorting(ESortId.CAPITAL)
    expect(wrapper.find('[data-test="chevron-up"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="chevron-down"]').exists()).toBe(false)
    await countryStore.setSorting(ESortId.CAPITAL)
    expect(wrapper.find('[data-test="chevron-up"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="chevron-down"]').exists()).toBe(false)
  })
})
