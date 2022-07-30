// import { readTextFile } from "@tauri-apps/api/fs";

import { appTemplate } from './App.template'

import { Editor } from './view/Editor/Editor'
import { Performance } from './view/Performance/Performance'
import { Rehearsal } from './view/Rehearsal/Rehearsal'
import { Settings } from './view/Settings/Settings'

export class App {
  private static debugMode = false

  constructor (debug = false) {
    App.debugMode = debug
    this.reset()

    App.debugLog('App loaded')
  }

  public reset () {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = appTemplate

    // Load views
    new Settings().load()
    new Editor().load()
    new Rehearsal().load()
    new Performance().load()

    App.debugLog('App reset')
  }

  public setContent (content: string): string {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = content
    App.debugLog('App content updated:', content)
    return content
  }

  // public static readContents(file: string): Promise<string> {
  //   return readTextFile(file)
  // }

  public static debugLog (...messages: any): string {
    const now = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', ' UTC')

    const log = [`[${now}]`, ...messages].join(' ')

    if (App.debugMode) {
      console.debug(log)
    }

    return log
  }
}
