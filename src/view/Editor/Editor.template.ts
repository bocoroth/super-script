const html = (str: TemplateStringsArray) => { return str.raw.join() }

export const editorTemplate = html`

<h1>Editor</h1>
<div id="editbox"></div>

`
