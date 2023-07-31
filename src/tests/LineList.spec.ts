import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import LineList from '../components/modules/LineList.vue'

describe('Running module/LineList tests...', () => {
  test('Component mounts properly', async () => {
    const wrapper = mount(LineList, {
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

  test('Component exports data properly', async () => {
    const wrapper = mount(LineList, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })

    expect(LineList.name).toBe('LineList')
    expect(LineList.data).toBeTypeOf('function')

    expect(wrapper.vm.$data.dtColumns).toBeTruthy()
    expect(wrapper.vm.$data.dtColumns).toBeTypeOf('object')
    expect(wrapper.vm.$data.dtColumns[0]).toBeTypeOf('object')

    expect(wrapper.vm.$data.dtOptions).toBeTruthy()
    expect(wrapper.vm.$data.dtOptions).toBeTypeOf('object')

    const gotoLine = wrapper.find('.goto-line')
    const gotoLineContainer = wrapper.find('.goto-line-container')
    expect(gotoLine).toBeTruthy()
    expect(gotoLineContainer).toBeTruthy()
    expect(gotoLine.element.children).toContain(gotoLineContainer.element)

    wrapper.unmount()
  })

  test('Add Go To Line block to DOM', async () => {
    const wrapper = mount(LineList, {
      global: {
        mocks: {
          // mock for vue-i18n
          $t: (msg: any) => msg
        }
      }
    })

    const gotoLine = wrapper.find('.goto-line')

    const testGotoNull = wrapper.vm.addGoToBlock(null)
    expect(testGotoNull).toBe(false)

    const testGoto = wrapper.vm.addGoToBlock(gotoLine.element)
    expect(testGoto).toBe(true)

    wrapper.unmount()
  })
})
