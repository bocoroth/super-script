import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { editBoxTemplate } from './EditBox.template'

// import { TinyMCE } from 'tinymce'
// import 'tinymce/themes/silver/theme'
// import 'tinymce/icons/default/icons'
// import 'tinymce/models/dom/model'

// declare const tinymce: TinyMCE

export class EditBox implements DOMComponent {
  selector: string
  readonly className = 'editbox-component'

  constructor (selector = '#editbox') {
    this.selector = selector
  }

  public load () {
    const editBoxElement = document.querySelector<HTMLDivElement>(this.selector)
    editBoxElement!.innerHTML = editBoxTemplate
    editBoxElement!.className = this.className

    // tinymce.init({
    //   selector: 'textarea#tinymce'
    // })

    App.debugLog('EditBox loaded.')
  }
}
