import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import CountrySearch from '@/components/CountrySearch.vue'

describe('CountrySearch: render', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(CountrySearch)
  })

  it('renders magnify icon', () => {
    expect(wrapper.find('[data-test="magnify-icon"]').exists()).toBe(true)
  })

  it('renders search input', () => {
    expect(wrapper.find('[data-test="search-input"]').exists()).toBe(true)
  })
})
