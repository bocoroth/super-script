import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { lineListTemplate } from './LineList.template'

export class LineList implements DOMComponent {
  selector: string
  readonly className = 'linelist-component'

  constructor (selector = '#linelist') {
    this.selector = selector
  }

  public load () {
    const lineListElement = document.querySelector<HTMLDivElement>(this.selector)
    lineListElement!.innerHTML = lineListTemplate
    lineListElement!.className = this.className
    App.debugLog('LineList loaded.')
  }
}
