import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'

import App from './App.vue'
import EditorTab from './components/view/EditorTab/EditorTab.vue'
import PerformanceTab from './components/view/PerformanceTab/PerformanceTab.vue'
import RehearsalTab from './components/view/RehearsalTab/RehearsalTab.vue'
import SettingsTab from './components/view/SettingsTab/SettingsTab.vue'

describe('Running App tests...', () => {
  test('App mounts properly', async () => {
    const wrapper = mount(App, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  test('App loads contents', async () => {
    const wrapper = mount(App, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper.getComponent(EditorTab))
    expect(wrapper.getComponent(PerformanceTab))
    expect(wrapper.getComponent(RehearsalTab))
    expect(wrapper.getComponent(SettingsTab))
  })
})
