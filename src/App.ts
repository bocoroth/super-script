 import { readTextFile } from "@tauri-apps/api/fs";
 import { appTemplate } from './App.template';

export class App {
  private test = false

  constructor(test = false) {
    if (!test) {
      this.reset(false)
      console.log('App loaded')
    }
    else {
      this.test = true
    }
  }

  public async reset(log = true) {
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = appTemplate
      if (log){
        console.log('App reset')
      }
  }

  public setContent(content: string): string {
    if (!this.test) {
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = content
      console.log('App content updated:', content)
    }
    return content
  }

  public static async readContents(file: string): Promise<string> {
    return readTextFile(file)
  }
}
