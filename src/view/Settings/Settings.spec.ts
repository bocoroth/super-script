// Settings unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Settings } from './Settings'

describe('Testing Settings', () => {
  let settings: Settings

  beforeEach(() => {
    settings = new Settings()
  })

  it('should create', () => {
    expect(settings).toBeTruthy()
  })
})
