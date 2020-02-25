import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSource = new BehaviorSubject<string>('')
  currentStatus = this.statusSource.asObservable()

  constructor() {}

  public changeStatus(status: string) {
    this.statusSource.next(status)
  }
}
