import { editorTemplate } from './Editor.template';

export class Editor {
    constructor() {}

    public load(selector: string) {
      document.querySelector<HTMLDivElement>(selector)!.innerHTML = editorTemplate
    }
}
