import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { externalTemplate } from './External.template'

export class External implements DOMComponent {
  selector: string
  readonly className = 'external-component'

  constructor (selector = '#external') {
    this.selector = selector
  }

  public load () {
    const externalElement = document.querySelector<HTMLDivElement>(this.selector)
    externalElement!.innerHTML = externalTemplate
    externalElement!.className = this.className
    App.debugLog('External loaded.')
  }
}
