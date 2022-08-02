import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { toolbarTemplate } from './Toolbar.template'

export class Toolbar implements DOMComponent {
  selector: string
  readonly className = 'toolbar-component'

  constructor (selector = '#toolbar') {
    this.selector = selector
  }

  public load () {
    const toolbarElement = document.querySelector<HTMLDivElement>(this.selector)
    toolbarElement!.innerHTML = toolbarTemplate
    toolbarElement!.classList.add(this.className)
    App.debugLog('Toolbar loaded.')
  }
}
