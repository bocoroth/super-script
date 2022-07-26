// External unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { External } from './External'

describe('Testing External', () => {
  let external: External

  beforeEach(() => {
    external = new External()
  })

  it('should create', () => {
    expect(external).toBeTruthy()
  })
})
