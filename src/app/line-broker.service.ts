import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
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

  constructor(private scriptService: ScriptService, private datatableService: DatatableService) {
    this.dtLoaded = false
  }

  changeEntry(entry: string) {
    this.entrySource.next(entry)
  }

  setScript(script: Script) {
    this.scriptService.setScript(script)
  }

  setDatatableInstance(dt: any) {
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

  destroyDatatableInstance() {
    this.datatableService.destroyDatatableInstance()
  }
}
