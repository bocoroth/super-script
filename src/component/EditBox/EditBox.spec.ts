// editBox unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { EditBox } from './EditBox'

describe('Testing editBox', () => {
  let editBox: EditBox
  let editBoxDiv: HTMLElement

  beforeEach(() => {
    editBoxDiv = document.createElement('div')
    editBoxDiv.setAttribute('id', 'editbox')
    document.body.appendChild(editBoxDiv)
    editBox = new EditBox()
  })

  it('should create', () => {
    expect(editBox).toBeTruthy()
  })

  it('should load', () => {
    editBox.load()
    const domValue = document.querySelector<HTMLDivElement>('#editbox')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(editBox.className)
  })
})
