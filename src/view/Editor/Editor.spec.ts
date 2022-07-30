// Editor unit tests
import { beforeEach, describe, expect, it } from 'vitest'
import { Editor } from './Editor'

describe('Testing Editor', () => {
  let editor: Editor
  let editorDiv: HTMLElement

  beforeEach(() => {
    editorDiv = document.createElement('div')
    editorDiv.setAttribute('id', 'editor')
    document.body.appendChild(editorDiv)
    editor = new Editor()
  })

  it('should create', () => {
    expect(editor).toBeTruthy()
  })

  it('should load', () => {
    editor.load()
    const domValue = document.querySelector<HTMLDivElement>('#editor')

    expect(domValue).toBeTruthy()
    expect(domValue!.innerHTML.length).toBeGreaterThan(0)
    expect(domValue!.className).toBe(editor.className)
  })
})
