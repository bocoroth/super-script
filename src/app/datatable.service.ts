import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private dtInstance: any // required to be 'any' to work with angular-datatables

  constructor() {
    this.dtInstance = null
  }

  public setDatatableInstance(dt: any) {
    this.dtInstance = dt
  }

  public getDatatableInstance(): Promise<any> {
    return this.dtInstance
  }

  public destroyDatatableInstance(): void {
    this.dtInstance.destroy()
  }
}
