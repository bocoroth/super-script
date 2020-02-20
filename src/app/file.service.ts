import { Injectable } from '@angular/core'
import { IpcService } from './ipc.service'
import { Script } from './script.interface'

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileDirectory: string
  private currentScript: Script

  constructor(private readonly _ipc: IpcService) {
    /*this._ipc.on('pong', (_event: Electron.IpcMessageEvent) => {
      console.log('pong')
    })*

    /*this._ipc.on('fileLoaded', (_event: Electron.IpcMessageEvent, data: any, filePath: string) => {
      console.log('data: ', JSON.parse(data))
      console.log('filePath: ', filePath)

      if (this.verifyFileStructure(data)) {
        this.fileDirectory = filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
        this.currentScript = JSON.parse(data)
      }
    })*/
  }

  public async loadFilePath(): Promise<string> {
    const filePath: string = await this._ipc.invoke('loadFilePath')
    this.fileDirectory = filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
    return filePath
  }

  public async loadScript(filePath: string): Promise<Script> {
    const script: string = await this._ipc.invoke('loadFile', filePath)
    if (this.verifyFileStructure(script)) {
      this.currentScript = JSON.parse(script)
      return JSON.parse(script)
    } else {
      console.warn('Invalid script file.')
      return null
    }
  }

  public saveFile() {}

  public testPing() {
    this._ipc.send('ping')
  }

  private verifyFileStructure(data: any): boolean {
    try {
      JSON.parse(data)
    } catch (exception) {
      console.warn(exception)
      return false
    }

    const parsed = JSON.parse(data)

    if (typeof parsed['meta'] === 'undefined') return false
    if (typeof parsed['text'] === 'undefined') return false

    return true
  }
}
