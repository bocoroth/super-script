import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
//import { ScriptService } from './script.service'
import { DatatableService } from './datatable.service'

@Injectable({
  providedIn: 'root'
})
export class LineBrokerService {
  private entrySource = new BehaviorSubject<string>('')
  currentEntry = this.entrySource.asObservable()
  private dt: any // required to be 'any' to work with angular-datatables
  private dtLoaded: boolean

  constructor(/*private scriptService: ScriptService, */ private datatableService: DatatableService) {
    this.dtLoaded = false
  }

  changeEntry(entry: string) {
    this.entrySource.next(entry)
  }

  setDatatableInstance(dt: any) {
    this.datatableService.setDatatableInstance(dt)
    this.dt = this.datatableService.getDatatableInstance()
    const self = this
    this.dt.on('select', function(_e: object, _dt: DataTables.Api, type: string, indexes: number[]) {
      if (type === 'row') {
        const data = self.dt.rows(indexes).data()
        self.changeEntry(data[0][4])
      }
    })

    this.dtLoaded = true
  }

  destroyDatatableInstance() {
    this.datatableService.destroyDatatableInstance()
  }
}
