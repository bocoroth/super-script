import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { rehearsalTemplate } from './Rehearsal.template'

export class Rehearsal implements DOMComponent {
  selector: string
  readonly className = 'rehearsal-component'

  constructor (selector = '#rehearsal') {
    this.selector = selector
  }

  public init () {
    const rehearsalElement = document.querySelector<HTMLDivElement>(this.selector)
    rehearsalElement!.innerHTML = rehearsalTemplate
    rehearsalElement!.classList.add(this.className)
    App.debugLog('Rehearsal loaded.')
  }
}
