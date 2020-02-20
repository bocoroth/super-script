import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    require: NodeRequire
  }
}

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private _ipc: IpcRenderer | undefined = void 0

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron IPC could not be loaded.')
    }
  }

  public on(channel: string, listener: any): void {
    if (!this._ipc) {
      return
    }
    this._ipc.on(channel, listener)
  }

  public send(channel: string, ...args: any): void {
    if (!this._ipc) {
      return
    }
    this._ipc.send(channel, ...args)
  }

  public async invoke(channel: string, ...args: any): Promise<any> {
    if (!this._ipc) {
      return
    }
    return this._ipc.invoke(channel, ...args)
  }
}
