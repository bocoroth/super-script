import { App } from '../../App'
import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { performanceTemplate } from './Performance.template'

export class Performance implements DOMComponent {
  selector: string
  readonly className = 'performance-component'

  constructor (selector = '#performance') {
    this.selector = selector
  }

  public load () {
    const performanceElement = document.querySelector<HTMLDivElement>(this.selector)
    performanceElement!.innerHTML = performanceTemplate
    performanceElement!.className = this.className
    App.debugLog('Performance loaded.')
  }
}
