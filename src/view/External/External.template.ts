const html = (str: TemplateStringsArray) => { return str.raw.join() }

export const externalTemplate = html`

<p>External</p>

`
