import { AfterViewInit, Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
import { IpcService } from '../../ipc.service'

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.scss']
})
export class RehearsalComponent implements AfterViewInit, OnInit {
  constructor(private status: StatusService, private readonly _ipc: IpcService) {}

  ngOnInit() {
    this.status.changeView('rehearsal')
  }

  ngAfterViewInit() {
    this._ipc.send('unloadPerformance')
  }
}
