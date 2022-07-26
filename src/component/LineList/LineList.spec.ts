// LineList unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { LineList } from './LineList'

describe('Testing LineList', () => {
  let lineList: LineList

  beforeEach(() => {
    lineList = new LineList()
  })

  it('should create', () => {
    expect(lineList).toBeTruthy()
  })
})
