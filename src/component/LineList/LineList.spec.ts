// LineList unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { LineList } from './LineList'

describe('Testing LineList', () => {
  let lineList: LineList
  let lineListDiv: HTMLElement

  beforeEach(() => {
    lineListDiv = document.createElement('div')
    lineListDiv.setAttribute('id', 'linelist')
    document.body.appendChild(lineListDiv)
    lineList = new LineList()
  })

  it('should create', () => {
    expect(lineList).toBeTruthy()
  })

  it('should load', () => {
    lineList.init()
    const domValue = document.querySelector<HTMLDivElement>('#linelist')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(lineList.className)
  })
})
