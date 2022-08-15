// DisplayBox unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { DisplayBox } from './DisplayBox'

describe('Testing DisplayBox', () => {
  let displayBox: DisplayBox
  let displayBoxDiv: HTMLElement

  beforeEach(() => {
    displayBoxDiv = document.createElement('div')
    displayBoxDiv.setAttribute('id', 'displaybox')
    document.body.appendChild(displayBoxDiv)
    displayBox = new DisplayBox()
  })

  it('should create', () => {
    expect(displayBox).toBeTruthy()
  })

  it('should load', () => {
    displayBox.init()
    const domValue = document.querySelector<HTMLDivElement>('#displaybox')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(displayBox.className)
  })
})
