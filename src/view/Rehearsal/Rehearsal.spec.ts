// Rehearsal unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Rehearsal } from './Rehearsal'

describe('Testing Rehearsal', () => {
  let rehearsal: Rehearsal

  beforeEach(() => {
    rehearsal = new Rehearsal()
  })

  it('should create', () => {
    expect(rehearsal).toBeTruthy()
  })
})
