import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { displayBoxTemplate } from './DisplayBox.template'

export class DisplayBox implements DOMComponent {
  selector: string
  readonly className = 'displaybox-component'

  constructor (selector = '#displaybox') {
    this.selector = selector
  }

  public init () {
    const displayBoxElement = document.querySelector<HTMLDivElement>(this.selector)
    displayBoxElement!.innerHTML = displayBoxTemplate
    displayBoxElement!.classList.add(this.className)
    App.debugLog('DisplayBox loaded.')
  }
}
