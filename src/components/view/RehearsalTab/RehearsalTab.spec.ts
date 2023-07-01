import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import RehearsalTab from './RehearsalTab.vue'

describe('Running view/RehearsalTab tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(RehearsalTab, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper).toBeTruthy()
  })
})
