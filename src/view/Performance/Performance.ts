import { performanceTemplate } from './Performance.template'

export class Performance {
    constructor() {}

    public load(selector: string) {
      document.querySelector<HTMLDivElement>(selector)!.innerHTML = performanceTemplate
    }
}
