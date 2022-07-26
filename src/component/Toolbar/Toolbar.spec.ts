// Toolbar unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Toolbar } from './Toolbar'

describe('Testing Toolbar', () => {
  let toolbar: Toolbar

  beforeEach(() => {
    toolbar = new Toolbar()
  })

  it('should create', () => {
    expect(toolbar).toBeTruthy()
  })
})
