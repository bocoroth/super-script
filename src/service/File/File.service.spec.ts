// FileService unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { FileService } from './File.service'

describe('Testing FileService', () => {
  let file: FileService

  beforeEach(() => {
    file = new FileService()
  })

  it('should create', () => {
    expect(file).toBeTruthy()
  })
})
