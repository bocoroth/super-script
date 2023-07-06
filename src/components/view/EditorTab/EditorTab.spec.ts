import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import EditorTab from './EditorTab.vue'
import EditBox from '../../modules/EditBox/EditBox.vue'
import LineList from '../../modules/LineList/LineList.vue'

describe('Running view/EditorTab tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(EditorTab, {
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

  test('Component loads contents', async () => {
    const wrapper = mount(EditorTab, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper.getComponent(EditBox))
    expect(wrapper.getComponent(LineList))

    wrapper.unmount()
  })
})
