import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import LineListButtons from '../components/modules/LineListButtons.vue'

describe('Running module/LinePreview tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(LineListButtons, {
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
