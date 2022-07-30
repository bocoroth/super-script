// Toolbar unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Toolbar } from './Toolbar'

describe('Testing Toolbar', () => {
  let toolbar: Toolbar
  let toolbarDiv: HTMLElement

  beforeEach(() => {
    toolbarDiv = document.createElement('div')
    toolbarDiv.setAttribute('id', 'toolbar')
    document.body.appendChild(toolbarDiv)
    toolbar = new Toolbar()
  })

  it('should create', () => {
    expect(toolbar).toBeTruthy()
  })

  it('should load', () => {
    toolbar.load()
    const domValue = document.querySelector<HTMLDivElement>('#toolbar')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(toolbar.className)
  })
})
