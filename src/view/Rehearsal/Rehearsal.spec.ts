// Rehearsal unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Rehearsal } from './Rehearsal'

describe('Testing Rehearsal', () => {
  let rehearsal: Rehearsal
  let rehearsalDiv: HTMLElement

  beforeEach(() => {
    rehearsalDiv = document.createElement('div')
    rehearsalDiv.setAttribute('id', 'rehearsal')
    document.body.appendChild(rehearsalDiv)
    rehearsal = new Rehearsal()
  })

  it('should create', () => {
    expect(rehearsal).toBeTruthy()
  })

  it('should load', () => {
    rehearsal.load()
    const domValue = document.querySelector<HTMLDivElement>('#rehearsal')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(rehearsal.className)
  })
})
