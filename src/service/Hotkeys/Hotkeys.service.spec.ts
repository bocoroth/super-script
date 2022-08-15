// HotkeysService unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { HotkeysService } from './Hotkeys.service'

describe('Testing HotkeysService', () => {
  let hotkeys: HotkeysService

  beforeEach(() => {
    hotkeys = new HotkeysService()
  })

  it('should create', () => {
    expect(hotkeys).toBeTruthy()
  })
})
