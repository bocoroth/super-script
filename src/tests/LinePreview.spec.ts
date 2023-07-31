import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import LinePreview from '../components/modules/LinePreview.vue'

describe('Running module/LinePreview tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(LinePreview, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper).toBeTruthy()

    wrapper.unmount()
  })
})
