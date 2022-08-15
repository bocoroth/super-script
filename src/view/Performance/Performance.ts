import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { performanceTemplate } from './Performance.template'

export class Performance implements DOMComponent {
  selector: string
  readonly className = 'performance-component'

  constructor (selector = '#performance') {
    this.selector = selector
  }

  public init () {
    const performanceElement = document.querySelector<HTMLDivElement>(this.selector)
    performanceElement!.innerHTML = performanceTemplate
    performanceElement!.classList.add(this.className)
    App.debugLog('Performance loaded.')
  }
}
