// ScriptService unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { ScriptService } from './Script.service'

describe('Testing ScriptService', () => {
  let script: ScriptService

  beforeEach(() => {
    script = new ScriptService()
  })

  it('should create', () => {
    expect(script).toBeTruthy()
  })
})
