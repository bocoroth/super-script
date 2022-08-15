// External unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { External } from './External'

describe('Testing External', () => {
  let external: External
  let externalDiv: HTMLElement

  beforeEach(() => {
    externalDiv = document.createElement('div')
    externalDiv.setAttribute('id', 'external')
    document.body.appendChild(externalDiv)
    external = new External()
  })

  it('should create', () => {
    expect(external).toBeTruthy()
  })

  it('should load', () => {
    external.init()
    const domValue = document.querySelector<HTMLDivElement>('#external')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(external.className)
  })
})
