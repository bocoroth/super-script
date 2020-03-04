import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { FileService } from './file.service'
import { ScriptService } from './script.service'
import { DatatableService } from './datatable.service'
import { Script } from './script.interface'
import { ScriptLine } from './script-line.interface'

@Injectable({
  providedIn: 'root'
})
export class LineBrokerService {
  private entrySource = new BehaviorSubject<string>('')
  private lineNumberSource = new BehaviorSubject<string>('')
  private durationMSSource = new BehaviorSubject<string>('')
  private cssClassSource = new BehaviorSubject<string>('')
  private dt: any // required to be 'any' to work with angular-datatables

  public dtLoaded: boolean

  currentEntry = this.entrySource.asObservable()
  lineNumber = this.lineNumberSource.asObservable()
  durationMS = this.durationMSSource.asObservable()
  cssClass = this.cssClassSource.asObservable()

  constructor(
    private fileService: FileService,
    private scriptService: ScriptService,
    private datatableService: DatatableService
  ) {
    this.dtLoaded = false
  }

  /* FILE LOADING/SAVING ******************************************************/
  async loadPath(): Promise<any> {
    return this.fileService.loadFilePath()
  }

  async importPath(): Promise<any> {
    return this.fileService.importFilePath()
  }

  async getSaveFilePath(): Promise<any> {
    return this.fileService.getSaveFilePath()
  }

  async loadFile(filePath: string): Promise<any> {
    return this.fileService.loadScript(filePath)
  }

  async importFile(filePath: string, fileType: string): Promise<any> {
    return this.fileService.importScript(filePath, fileType)
  }

  async saveFile(filePath: string = null): Promise<any> {
    filePath = filePath === null ? this.fileService.getFilePath() : filePath
    const script: Script = this.scriptService.getScript()
    return this.fileService.saveScript(filePath, script)
  }

  public setFilePath(filePath: string) {
    this.fileService.setFilePath(filePath)
    localStorage.setItem('ht-path', filePath)
  }

  public getFilePath(): string {
    return this.fileService.getFilePath()
  }

  /* OBSERVABLE WRITING *******************************************************/
  public changeEntry(entry: string) {
    this.entrySource.next(entry)
  }

  public changeLineNumber(lineNumber: string) {
    this.lineNumberSource.next(lineNumber)
  }

  public changeDurationMS(durationMS: string) {
    this.durationMSSource.next(durationMS)
  }

  public changeCssClass(cssClass: string) {
    this.cssClassSource.next(cssClass)
  }

  /* EDIT BOX<->LINE LIST WIRING **********************************************/
  public setEditBox(rowArray: string[]) {
    this.changeLineNumber(rowArray[0])
    this.changeDurationMS(rowArray[3])
    $('#durationMS').val(rowArray[3])
    this.changeCssClass(rowArray[4])
    $('#cssClass').val(rowArray[4])
    this.changeEntry(rowArray[5])
  }

  public setApplyAllButton(isEnabled: boolean) {
    $('#btnApplyAll').prop('disabled', !isEnabled)
  }

  /* SCRIPT FUNCTIONS *********************************************************/
  public getScript(): Script {
    return this.scriptService.getScript()
  }

  public getMetaStyles(): string {
    return this.scriptService.getMetaStyles()
  }

  public setScript(script: Script) {
    this.scriptService.setScript(script)
  }

  public getLine(id: number): ScriptLine {
    return this.scriptService.getLine(id)
  }

  public editLine(line: ScriptLine) {
    this.scriptService.editLine(line)
  }

  public addLine(line: ScriptLine) {
    this.scriptService.addLine(line)
  }

  public deleteLine(lineNumber: number) {
    const ret = this.scriptService.deleteLine(lineNumber)
    return ret
  }

  public insertBlankLine(insertAtID: number = null, insertBefore = false) {
    this.scriptService.insertBlankLine(insertAtID, insertBefore)
  }

  /* DATATABLE FUNCTIONS ******************************************************/
  public setDatatableInstance(dt: any) {
    this.datatableService.setDatatableInstance(dt)
    this.dt = this.datatableService.getDatatableInstance()
    const self = this
    this.dt.on('select', function(_e: object, _dt: DataTables.Api, type: string, indexes: number[]) {
      if (type === 'row') {
        const data: string[][] = self.dt.rows(indexes).data()
        self.setEditBox(data[0])
      }
      if (indexes.length > 1) {
        self.setApplyAllButton(true)
      } else {
        self.setApplyAllButton(false)
      }
    })

    this.dtLoaded = true
  }

  public getDatatableInstance(): any {
    return this.dt
  }

  public loadDatatable() {
    if (this.dtLoaded) {
      this.dt.clear()

      const script = this.getScript()

      if (typeof script.text !== 'undefined') {
        let lineCount = 0
        for (const line of script.text) {
          if (typeof line.startTime === 'undefined') {
            line.startTime = ''
          }
          if (typeof line.endTime === 'undefined') {
            line.endTime = ''
          }
          if (typeof line.durationMS === 'undefined') {
            line.durationMS = 0
          }
          if (typeof line.cssClass === 'undefined') {
            line.cssClass = ''
          }
          if (typeof line.text === 'undefined') {
            line.text = ''
          }
          const lineArray = [line.id, line.startTime, line.endTime, line.durationMS, line.cssClass, line.text]
          this.dt.row.add(lineArray)
          this.dt.draw()
          lineCount++
        }

        // blank line for editing
        const lastLine = [lineCount, '', '', 0, '', '']

        this.dt.row.add(lastLine)
        this.dt.draw()
      }
    }
  }

  public selectDatatableRow(rowID: number) {
    this.dt.row(`:eq(${rowID})`).select()
    const rowArray = this.dt.row(`:eq(${rowID})`).data()
    this.setEditBox(rowArray)
  }

  public destroyDatatableInstance() {
    this.datatableService.destroyDatatableInstance()
  }
}
