// Performance unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Performance } from './Performance'

describe('Testing Performance', () => {
  let performance: Performance
  let performanceDiv: HTMLElement

  beforeEach(() => {
    performanceDiv = document.createElement('div')
    performanceDiv.setAttribute('id', 'performance')
    document.body.appendChild(performanceDiv)
    performance = new Performance()
  })

  it('should create', () => {
    expect(performance).toBeTruthy()
  })

  it('should load', () => {
    performance.load()
    const domValue = document.querySelector<HTMLDivElement>('#performance')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(performance.className)
  })
})
