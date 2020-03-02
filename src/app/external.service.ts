import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IpcService } from './ipc.service'
@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  private lineSource = new BehaviorSubject<string>('')
  private classSource = new BehaviorSubject<string>('')
  private styleSource = new BehaviorSubject<string>('')
  currentLine = this.lineSource.asObservable()
  currentClass = this.classSource.asObservable()
  currentStyle = this.styleSource.asObservable()

  constructor(private readonly _ipc: IpcService) {}

  public setExternal(line: string, nClass: string, styles = '') {
    this.loadLine(line)
    this.loadClass(nClass)
    this.loadStyles(styles)
  }

  public changeLine(newLine: string) {
    this.lineSource.next(newLine)
  }

  public getLine(): string {
    return this.lineSource.getValue()
  }

  public changeClass(newClass: string) {
    this.classSource.next(newClass)
  }

  public getClass(): string {
    return this.classSource.getValue()
  }

  public changeStyle(newStyle: string) {
    this.styleSource.next(newStyle)
  }

  public getStyle(): string {
    return this.styleSource.getValue()
  }

  public loadStyles(css: string): void {
    this._ipc.send('loadExternalStyles', css)
  }

  public loadLine(line: string): void {
    this._ipc.send('loadExternalLine', line)
  }

  public loadClass(newClass: string): void {
    this._ipc.send('loadExternalClass', newClass)
  }

  public hide(): void {
    this._ipc.send('hideExternal')
  }

  public show(): void {
    this._ipc.send('showExternal')
  }

  public async hiddenStatus(): Promise<any> {
    const response = this._ipc.invoke('getExternalHiddenStatus')
    return response
  }

  public hideLine(): void {
    this._ipc.send('hideExternalLine')
  }

  public showLine(): void {
    this._ipc.send('showExternalLine')
  }
}
