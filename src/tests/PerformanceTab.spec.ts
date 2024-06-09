import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import PerformanceTab from '../components/views/PerformanceTab.vue'

describe('Running view/PerformanceTab tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(PerformanceTab, {
      // global: {
      //   mocks: {
      //     // mock for vue-i18n
      //     $t: (msg: any) => msg
      //   }
      // }
    })
    expect(wrapper).toBeTruthy()

    wrapper.unmount()
  })
})
