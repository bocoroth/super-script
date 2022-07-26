// Editor unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Editor } from './Editor'

describe('Testing Editor', () => {
  let editor: Editor

  beforeEach(() => {
    editor = new Editor()
  })

  it('should create', () => {
    expect(editor).toBeTruthy()
  })
})
