 import { readTextFile } from "@tauri-apps/api/fs";

 import { appTemplate } from './App.template';

 import { Editor } from './view/Editor/Editor'
 import { Performance } from './view/Performance/Performance'
 import { Rehearsal } from './view/Rehearsal/Rehearsal'
 import { Settings } from './view/Settings/Settings'

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

  public reset(log = true) {
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = appTemplate

      // Load views
      new Settings().load('#settings')
      new Editor().load('#editor')
      new Rehearsal().load('#rehearsal')
      new Performance().load('#performance')

      if (log) {
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

  public static readContents(file: string): Promise<string> {
    return readTextFile(file)
  }
}
