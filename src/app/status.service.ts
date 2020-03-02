import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSource = new BehaviorSubject<string>('')
  private viewSource = new BehaviorSubject<string>('')
  currentStatus = this.statusSource.asObservable()
  currentView = this.viewSource.asObservable()

  constructor() {}

  public changeStatus(status: string) {
    this.statusSource.next(status)
  }

  public getStatus(): string {
    return this.statusSource.getValue()
  }

  public changeView(view: string) {
    this.viewSource.next(view)
    console.log('View: ' + view)
  }

  public getView(): string {
    return this.viewSource.getValue()
  }
}
