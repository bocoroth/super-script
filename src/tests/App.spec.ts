import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'

import App from '../App.vue'
import EditorTab from '../components/views/EditorTab.vue'
import PerformanceTab from '../components/views/PerformanceTab.vue'
import SettingsTab from '../components/views/SettingsTab.vue'

describe('Running App tests...', () => {
  test('App mounts properly', async () => {
    const wrapper = mount(App, {
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

  test('App loads contents', async () => {
    const wrapper = mount(App, {
      // global: {
      //   mocks: {
      //     // mock for vue-i18n
      //     $t: (msg: any) => msg
      //   }
      // }
    })
    expect(wrapper.getComponent(EditorTab))
    expect(wrapper.getComponent(PerformanceTab))
    expect(wrapper.getComponent(SettingsTab))

    wrapper.unmount()
  })
})
