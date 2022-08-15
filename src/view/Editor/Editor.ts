import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { editorTemplate } from './Editor.template'

import { EditBox } from '../../component/EditBox/EditBox'
import { LineList } from '../../component/LineList/LineList'

export class Editor implements DOMComponent {
  selector: string
  readonly className = 'editor-component'

  constructor (selector = '#editor') {
    this.selector = selector
  }

  public init () {
    const editorElement = document.querySelector<HTMLDivElement>(this.selector)
    editorElement!.innerHTML = editorTemplate
    editorElement!.classList.add(this.className)

    new EditBox('#editor_editbox').init()
    new LineList('#editor_linelist').init()

    App.debugLog('Editor loaded.')
  }
}
