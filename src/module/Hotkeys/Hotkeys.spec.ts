// Hotkeys unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Hotkeys } from './Hotkeys'

describe('Testing Hotkeys', () => {
  let hotkeys: Hotkeys

  beforeEach(() => {
    hotkeys = new Hotkeys()
  })

  it('should create', () => {
    expect(hotkeys).toBeTruthy()
  })
})
