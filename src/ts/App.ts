export class App {
  private default = `
    <h1>Hypertitles Test</h1>
    <p>This is a test.</p>
    <button class="btn btn-primary">Test Button</button>
  `
  private test = false

  constructor(test = false) {
    if (!test) {
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = this.default
      console.log('App loaded')
    }
    else {
      this.test = true
    }
  }

  public reset() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = this.default
    console.log('App reset')
  }

  public setContent(content: string): string {
    if (!this.test) {
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = content
      console.log('App content updated:', content)
    }
    return content
  }
}
