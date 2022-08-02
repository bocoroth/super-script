import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { editorTemplate } from './Editor.template'

import { EditBox } from '../../component/EditBox/EditBox'

export class Editor implements DOMComponent {
  selector: string
  readonly className = 'editor-component'

  constructor (selector = '#editor') {
    this.selector = selector
  }

  public load () {
    const editorElement = document.querySelector<HTMLDivElement>(this.selector)
    editorElement!.innerHTML = editorTemplate
    editorElement!.classList.add(this.className)

    new EditBox('#editbox').load()

    App.debugLog('Editor loaded.')
  }
}
