import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import SettingsTab from '../components/views/SettingsTab.vue'

describe('Running view/SettingsTab tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(SettingsTab, {
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
