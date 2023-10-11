import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import CountryTable from '@/components/CountryTable.vue'

describe('CountryTable: render', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = mount(CountryTable, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it('renders table head component', () => {
    expect(wrapper.find('[data-test="table-head"]').exists()).toBe(true)
  })

  it('renders table body component', async () => {
    expect(wrapper.find('[data-test="table-body"]').exists()).toBe(true)
  })
})
