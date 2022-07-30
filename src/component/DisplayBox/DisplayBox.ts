import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { displayBoxTemplate } from './DisplayBox.template'

export class DisplayBox implements DOMComponent {
  selector: string
  readonly className = 'displaybox-component'

  constructor (selector = '#displaybox') {
    this.selector = selector
  }

  public load () {
    const displayBoxElement = document.querySelector<HTMLDivElement>(this.selector)
    displayBoxElement!.innerHTML = displayBoxTemplate
    displayBoxElement!.className = this.className
    App.debugLog('DisplayBox loaded.')
  }
}
