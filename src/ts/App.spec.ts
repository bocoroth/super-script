// App unit tests
import { App } from './App'
import { describe, expect, test } from 'vitest'

describe('Testing main App', () => {
  test('app content should update', () => {
    const app = new App(true)
    const test = app.setContent('test')
    expect(test).toBe('test')
  })
})
