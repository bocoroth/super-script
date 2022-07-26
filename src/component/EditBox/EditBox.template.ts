const html = (str: TemplateStringsArray) => { return str.raw.join() }

export const editBoxTemplate = html`

<textarea id="tinymce"></textarea>

`
