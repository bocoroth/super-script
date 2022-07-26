// App unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

describe('Testing main App', () => {
  let app: App

  beforeEach(() => {
    app = new App(true)
  })

  it('should create', () => {
    expect(app).toBeTruthy()
  })

  it('should update', () => {
    const test = app.setContent('test')
    expect(test).toBe('test')
  })
})
