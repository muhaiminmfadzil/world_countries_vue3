import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView: render', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(HomeView)
  })

  it('renders heading', () => {
    expect(wrapper.find('[data-test="heading"]').exists()).toBe(true)
  })

  it('renders description', () => {
    expect(wrapper.find('[data-test="description"]').exists()).toBe(true)
  })
})
