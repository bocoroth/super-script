// DisplayBox unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { DisplayBox } from './DisplayBox'

describe('Testing DisplayBox', () => {
  let displayBox: DisplayBox

  beforeEach(() => {
    displayBox = new DisplayBox()
  })

  it('should create', () => {
    expect(displayBox).toBeTruthy()
  })
})
