import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { settingsTemplate } from './Settings.template'

export class Settings implements DOMComponent {
  selector: string
  readonly className = 'settings-component'

  constructor (selector = '#settings') {
    this.selector = selector
  }

  public init () {
    const settingsElement = document.querySelector<HTMLDivElement>(this.selector)
    settingsElement!.innerHTML = settingsTemplate
    settingsElement!.classList.add(this.className)
    App.debugLog('Settings loaded.')
  }
}
