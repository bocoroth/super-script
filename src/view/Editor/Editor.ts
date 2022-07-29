import { editorTemplate } from './Editor.template'

import { EditBox } from '../../component/EditBox/EditBox'

export class Editor {
  // constructor () {}

  public load (selector: string) {
    document.querySelector<HTMLDivElement>(selector)!.innerHTML = editorTemplate

    new EditBox().load('#editbox')
  }
}
