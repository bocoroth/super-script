// App unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

describe('Testing main App', () => {
  let app: App
  let appDiv: HTMLElement

  beforeEach(() => {
    appDiv = document.createElement('div')
    appDiv.setAttribute('id', 'app')
    document.body.appendChild(appDiv)
    app = new App()
  })

  it('should create', () => {
    const domValue = document.querySelector<HTMLDivElement>('#app')
    expect(app).toBeTruthy()
    expect(domValue).toBeTruthy()
  })

  it('should update', () => {
    const test = app.setContent('test')
    const domValue = document.querySelector<HTMLDivElement>('#app')!.innerHTML

    expect(test).toBe('test')
    expect(domValue).toBe('test')
  })

  it('should contain correct containers', () => {
    app.reset()

    const appElement = document.querySelector<HTMLDivElement>('#app')
    const settingsElement = document.querySelector<HTMLDivElement>('#settings')
    const editorElement = document.querySelector<HTMLDivElement>('#editor')
    const rehearsalElement = document.querySelector<HTMLDivElement>('#rehearsal')
    const performanceElement = document.querySelector<HTMLDivElement>('#performance')

    expect(appElement).toContain(settingsElement)
    expect(appElement).toContain(editorElement)
    expect(appElement).toContain(rehearsalElement)
    expect(appElement).toContain(performanceElement)
  })

  it('should log a debug message correctly', () => {
    app = new App(true)
    const test = App.debugLog('test')

    expect(test).toMatch(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} UTC\] test$/)
    expect(test).toHaveLength(34)
  })
})
