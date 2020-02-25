import { Injectable } from '@angular/core'
import { IpcService } from './ipc.service'
import { Script } from './script.interface'

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileDirectory: string
  private fileName: string
  private filePath: string
  private currentScript: Script

  constructor(private readonly _ipc: IpcService) {
    // IPC test
    this._ipc.on('pong', (_event: Electron.IpcMessageEvent) => {
      console.log('pong')
    })
  }

  public async loadFilePath(): Promise<string> {
    const filePath: string = await this._ipc.invoke('loadFilePath')
    this.filePath = filePath
    this.fileDirectory = filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
    this.fileName = filePath.substring(1, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
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

  public async saveScript(filePath: string, script: Script): Promise<any> {
    const response: any = await this._ipc.invoke('saveFile', script, filePath)
    return response
  }

  public getScript(): Script {
    return this.currentScript
  }

  public getFileDirectory(): string {
    return this.fileDirectory
  }

  public setFileDirectory(dir: string): void {
    this.fileDirectory = dir
  }

  public getFileName(): string {
    return this.fileName
  }

  public setFileName(name: string): void {
    this.fileName = name
  }

  public getFilePath(): string {
    return this.filePath
  }

  public setFilePath(path: string): void {
    this.filePath = path
  }

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
