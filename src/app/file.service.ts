import { Injectable } from '@angular/core'
import { IpcService } from './ipc.service'
import { Script } from './script.interface'
import { ScriptLine } from './script-line.interface'
//import { ScriptMeta } from './script-meta.interface'

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileDirectory: string
  private fileName: string
  private filePath: string

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

  public async importFilePath(): Promise<string> {
    const filePath: string = await this._ipc.invoke('importFilePath')
    this.filePath = null
    this.fileDirectory = null
    this.fileName = null
    return filePath
  }

  public async loadScript(filePath: string): Promise<Script> {
    const script: string = await this._ipc.invoke('loadFile', filePath)
    if (this.verifyFileStructure(script)) {
      return JSON.parse(script)
    } else {
      console.warn('Invalid script file.')
      return null
    }
  }

  public async importScript(filePath: string, fileType: string): Promise<Script> {
    const file: string = await this._ipc.invoke('importFile', filePath)

    const script: Script = {
      meta: {
        workTitle: '',
        authorName: '',
        composerName: '',
        editorName: '',
        dateCreated: '',
        dateModified: '',
        performanceNotes: '',
        css: ''
      },
      text: []
    }

    if (fileType === 'sub') {
      // TODO: more filetype imports
    } else {
      // Filetype text (default)
      const lines = file.split('\n')
      let id = 0
      for (const line of lines) {
        const newLine: ScriptLine = {
          id: id,
          text: line,
          durationMS: 0
        }
        script.text.push(newLine)
        id++
      }
    }
    return script
  }

  public async getSaveFilePath(): Promise<string> {
    const filePath: string = await this._ipc.invoke('getSaveFilePath')
    return filePath
  }

  public async saveScript(filePath: string, script: Script): Promise<any> {
    const response: any = await this._ipc.invoke('saveFile', script, filePath)
    // ensure file service has correct file params if Save As
    this.filePath = filePath
    this.fileDirectory = filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
    this.fileName = filePath.substring(1, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')))
    return response
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
