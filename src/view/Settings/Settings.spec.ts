// Settings unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Settings } from './Settings'

describe('Testing Settings', () => {
  let settings: Settings
  let settingsDiv: HTMLElement

  beforeEach(() => {
    settingsDiv = document.createElement('div')
    settingsDiv.setAttribute('id', 'settings')
    document.body.appendChild(settingsDiv)
    settings = new Settings()
  })

  it('should create', () => {
    expect(settings).toBeTruthy()
  })

  it('should load', () => {
    settings.load()
    const domValue = document.querySelector<HTMLDivElement>('#settings')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(settings.className)
  })
})
