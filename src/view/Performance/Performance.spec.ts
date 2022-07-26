// Performance unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Performance } from './Performance'

describe('Testing Performance', () => {
  let performance: Performance

  beforeEach(() => {
    performance = new Performance()
  })

  it('should create', () => {
    expect(performance).toBeTruthy()
  })
})
