// editBox unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { EditBox } from './EditBox'

describe('Testing editBox', () => {
  let editBox: EditBox

  beforeEach(() => {
    editBox = new EditBox()
  })

  it('should create', () => {
    expect(editBox).toBeTruthy()
  })
})
