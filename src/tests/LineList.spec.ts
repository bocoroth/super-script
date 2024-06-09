import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import LineList from '../components/modules/LineList.vue'

describe('Running module/LineList tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(LineList, {
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
