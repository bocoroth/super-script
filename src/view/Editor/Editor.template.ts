const html = (str: TemplateStringsArray) => { return str.raw.join() }

export const editorTemplate = html`

<div id="editor_editbox"></div>
<div id="editor_linelist"></div>

`
