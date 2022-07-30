import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { rehearsalTemplate } from './Rehearsal.template'

export class Rehearsal implements DOMComponent {
  selector: string
  readonly className = 'rehearsal-component'

  constructor (selector = '#rehearsal') {
    this.selector = selector
  }

  public load () {
    const rehearsalElement = document.querySelector<HTMLDivElement>(this.selector)
    rehearsalElement!.innerHTML = rehearsalTemplate
    rehearsalElement!.className = this.className
    App.debugLog('Rehearsal loaded.')
  }
}
