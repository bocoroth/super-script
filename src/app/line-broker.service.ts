import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { FileService } from './file.service'
import { ScriptService } from './script.service'
import { DatatableService } from './datatable.service'
import { Script } from './script.interface'

@Injectable({
  providedIn: 'root'
})
export class LineBrokerService {
  private entrySource = new BehaviorSubject<string>('')
  private dt: any // required to be 'any' to work with angular-datatables

  public dtLoaded: boolean

  currentEntry = this.entrySource.asObservable()

  constructor(
    private fileService: FileService,
    private scriptService: ScriptService,
    private datatableService: DatatableService
  ) {
    this.dtLoaded = false
  }

  async loadPath(): Promise<any> {
    return this.fileService.loadFilePath()
  }

  async loadFile(filePath: string): Promise<any> {
    return this.fileService.loadScript(filePath)
  }

  async saveFile(): Promise<any> {
    const filePath: string = this.fileService.getFilePath()
    const script: Script = this.scriptService.getScript()
    return this.fileService.saveScript(filePath, script)
  }

  public changeEntry(entry: string) {
    this.entrySource.next(entry)
  }

  public getScript(): Script {
    return this.scriptService.getScript()
  }

  public setScript(script: Script) {
    this.scriptService.setScript(script)
  }

  public setFilePath(filePath: string) {
    this.fileService.setFilePath(filePath)
  }

  public setDatatableInstance(dt: any) {
    this.datatableService.setDatatableInstance(dt)
    this.dt = this.datatableService.getDatatableInstance()
    const self = this
    this.dt.on('select', function(_e: object, _dt: DataTables.Api, type: string, indexes: number[]) {
      if (type === 'row') {
        const data = self.dt.rows(indexes).data()
        self.changeEntry(data[0][5])
      }
    })

    this.dtLoaded = true
  }

  public loadDatatable() {
    if (this.dtLoaded) {
      this.dt.clear()

      const script = this.getScript()

      console.log(script)

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

  public destroyDatatableInstance() {
    this.datatableService.destroyDatatableInstance()
  }
}
