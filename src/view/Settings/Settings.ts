import { settingsTemplate } from './Settings.template';

export class Settings {
    constructor() {}

    public load(selector: string) {
      document.querySelector<HTMLDivElement>(selector)!.innerHTML = settingsTemplate
    }
}
