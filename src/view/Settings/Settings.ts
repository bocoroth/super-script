import { settingsTemplate } from './Settings.template'

export class Settings {
  private selector: string

  constructor () {
    this.selector = '#settings'
  }

  public load (selector: string) {
    this.selector = selector
    document.querySelector<HTMLDivElement>(this.selector)!.innerHTML = settingsTemplate
  }
}
