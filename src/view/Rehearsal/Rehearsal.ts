import { rehearsalTemplate } from './Rehearsal.template';

export class Rehearsal {
    constructor() {}

    public load(selector: string) {
      document.querySelector<HTMLDivElement>(selector)!.innerHTML = rehearsalTemplate
    }
}
