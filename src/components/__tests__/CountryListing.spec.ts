import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CountryListing from '@/components/CountryListing.vue'

describe('CountryListing: render', () => {
  it('renders search and table component', () => {
    const wrapper = mount(CountryListing)

    expect(wrapper.find('[data-test="search"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="table"]').exists()).toBe(true)
  })
})
