// SettingsService unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { SettingsService } from './Settings.service'

describe('Testing SettingsService', () => {
  let settings: SettingsService

  beforeEach(() => {
    settings = new SettingsService()
  })

  it('should create', () => {
    expect(settings).toBeTruthy()
  })
})
